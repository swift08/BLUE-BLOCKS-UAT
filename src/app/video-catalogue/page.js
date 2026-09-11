import PageJsonLd from "@/components/seo/PageJsonLd";
import VideoCatalogueClient from "@/components/catalogue/VideoCatalogueClient";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import {
  buildVideoCatalogueSchema,
  videoCatalogueMeta,
} from "@/data/videoCatalogue";

export const dynamic = "force-static";

export const metadata = buildPageMetadata({
  path: videoCatalogueMeta.path,
  title: videoCatalogueMeta.title,
  description: videoCatalogueMeta.description,
  keywords: [videoCatalogueMeta.focusKeyword],
  ogImage: "https://blueblocks.in/images/og-homepage.webp",
});

export default function VideoCataloguePage() {
  return (
    <>
      <PageJsonLd baseId="video-catalogue" schema={buildVideoCatalogueSchema()} />
      <VideoCatalogueClient />
    </>
  );
}
