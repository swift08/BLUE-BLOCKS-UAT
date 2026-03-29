function withTrailingSlash(value = "/") {
  const str = String(value || "/");
  return str.endsWith("/") ? str : `${str}/`;
}

const UPSTREAM_BLOG_URL = withTrailingSlash(
  process.env.BLOG_UPSTREAM_URL || "https://blueblocks.in/blog/"
);
const UPSTREAM_URL_OBJ = new URL(UPSTREAM_BLOG_URL);

const BLOG_ORIGIN = UPSTREAM_URL_OBJ.origin;
const BLOG_ROOT_PATH = withTrailingSlash(UPSTREAM_URL_OBJ.pathname || "/blog/");
const BLOG_EMBED_PATH = "/blog/embed/";

const HIDE_SELECTORS = [
  "header",
  "footer",
  "#masthead",
  "#colophon",
  ".site-header",
  ".site-footer",
  ".main-header",
  ".main-footer",
  ".navbar",
  ".topbar",
  ".top-bar",
  ".wp-block-template-part",
  ".elementor-location-header",
  ".elementor-location-footer",
];

const INJECTED_STYLE = `
html,
body {
  background: transparent !important;
}
${HIDE_SELECTORS.join(",\n")} {
  display: none !important;
}
.site,
#page,
.wp-site-blocks,
main,
.site-main,
#content,
.content-area {
  background: transparent !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
}
`;

const INJECTED_SCRIPT = `
(function () {
  var hideSelectors = ${JSON.stringify(HIDE_SELECTORS)};

  function stripChrome() {
    hideSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.remove();
      });
    });
    document.documentElement.style.background = "transparent";
    if (document.body) document.body.style.background = "transparent";
  }

  function normalizeLocalBlogPath(url) {
    if (url.origin !== "${BLOG_ORIGIN}") return null;
    if (!url.pathname.startsWith("/blog")) return null;

    var localPath = url.pathname.replace(/^\\/blog\\/?/, "${BLOG_EMBED_PATH}");
    if (!localPath.endsWith("/")) localPath += "/";
    return localPath + (url.search || "") + (url.hash || "");
  }

  function reportHeight() {
    var doc = document.documentElement;
    var body = document.body;
    var height = Math.max(
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      doc ? doc.scrollHeight : 0,
      doc ? doc.offsetHeight : 0,
      doc ? doc.clientHeight : 0
    );

    if (!window.parent || window.parent === window) return;
    window.parent.postMessage(
      { type: "bb-blog-embed-height", height: height },
      window.location.origin
    );
  }

  var raf = null;
  function scheduleHeightReport() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(reportHeight);
  }

  function rewriteInternalAnchors() {
    var anchors = document.querySelectorAll("a[href]");
    anchors.forEach(function (anchor) {
      var href = anchor.getAttribute("href");
      if (!href || href[0] === "#") return;
      if (href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("javascript:") === 0) {
        return;
      }

      var url;
      try {
        url = new URL(href, "${BLOG_ORIGIN}");
      } catch (_err) {
        return;
      }

      var localTarget = normalizeLocalBlogPath(url);
      if (!localTarget) return;

      anchor.setAttribute("href", localTarget);
      anchor.setAttribute("target", "_self");
      anchor.removeAttribute("rel");
    });
  }

  function onLinkClick(event) {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    var anchor = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!anchor) return;

    var href = anchor.getAttribute("href");
    if (!href || href[0] === "#") return;
    if (href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("javascript:") === 0) return;

    var url;
    try {
      url = new URL(href, "${BLOG_ORIGIN}");
    } catch (_err) {
      return;
    }

    var localTarget = normalizeLocalBlogPath(url);
    if (!localTarget) return;

    event.preventDefault();
    window.location.href = localTarget;
  }

  stripChrome();
  rewriteInternalAnchors();
  scheduleHeightReport();

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        stripChrome();
        rewriteInternalAnchors();
        scheduleHeightReport();
      },
      { once: true }
    );
  }

  var observer = new MutationObserver(function () {
    stripChrome();
    rewriteInternalAnchors();
    scheduleHeightReport();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  });

  var resizeObserver = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(scheduleHeightReport);
    if (document.body) resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);
  }

  window.addEventListener("load", scheduleHeightReport);
  window.addEventListener("resize", scheduleHeightReport);
  document.addEventListener("load", scheduleHeightReport, true);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleHeightReport);
  }

  setTimeout(scheduleHeightReport, 200);
  setTimeout(scheduleHeightReport, 800);
  setTimeout(scheduleHeightReport, 1500);

  document.addEventListener("click", onLinkClick, true);
})();
`;

function injectHtml(html) {
  const payload = `
<base href="${BLOG_ORIGIN}/" />
<link rel="stylesheet" href="/blog-embed-overrides.css" />
<style id="bb-blog-proxy-style">${INJECTED_STYLE}</style>
<script id="bb-blog-proxy-script">${INJECTED_SCRIPT}</script>
`;

  if (html.includes("</head>")) {
    return html.replace("</head>", `${payload}</head>`);
  }

  return `${payload}${html}`;
}

function normalizeBlogPath(parts) {
  if (!parts?.length) return BLOG_ROOT_PATH;
  const clean = parts.filter(Boolean).join("/").replace(/^\/+|\/+$/g, "");
  return `${BLOG_ROOT_PATH}${clean}/`;
}

export const revalidate = 300;

export async function GET(request, context) {
  const params = await context.params;
  const blogPath = normalizeBlogPath(params?.slug);
  const incomingUrl = new URL(request.url);

  const upstreamUrl = new URL(blogPath, BLOG_ORIGIN);
  upstreamUrl.search = incomingUrl.search;

  let upstream;
  try {
    upstream = await fetch(upstreamUrl.toString(), {
      headers: {
        "user-agent": "BlueBlocksBlogEmbed/1.0",
      },
      next: { revalidate },
    });
  } catch {
    return new Response(
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${upstreamUrl.toString()}" />
    <title>Loading blog…</title>
  </head>
  <body style="font-family:Poppins,Arial,sans-serif;padding:24px">
    <p>Redirecting to live blog…</p>
    <p><a href="${upstreamUrl.toString()}">Open live blog</a></p>
  </body>
</html>`,
      {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }

  const contentType = upstream.headers.get("content-type") || "";
  const isHtml = contentType.includes("text/html");

  if (!isHtml) {
    const raw = await upstream.arrayBuffer();
    return new Response(raw, {
      status: upstream.status,
      headers: {
        "content-type": contentType || "application/octet-stream",
        "cache-control": `public, s-maxage=${revalidate}, stale-while-revalidate=900`,
      },
    });
  }

  const html = await upstream.text();
  const transformed = injectHtml(html);

  return new Response(transformed, {
    status: upstream.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": `public, s-maxage=${revalidate}, stale-while-revalidate=900`,
    },
  });
}
