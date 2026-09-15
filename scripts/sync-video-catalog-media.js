/**
 * sync-video-catalog-media.js
 *
 * Links (or copies) the existing local videos into public/video-catalog/videos
 * so Next can serve them. Does not commit large files.
 *
 * Source of truth:
 *   src/assets/wetransfer_blue-blocks-12-videos_2026-04-24_0904/Blue Blocks-12-Videos
 *
 * Hero / CTA prefer WebM when present (Pony Tail Girl.webm, Safe Transport.webm).
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const SRC = path.join(
  process.cwd(),
  "src",
  "assets",
  "wetransfer_blue-blocks-12-videos_2026-04-24_0904",
  "Blue Blocks-12-Videos"
);
const DEST = path.join(process.cwd(), "public", "video-catalog", "videos");
const THUMBS = path.join(process.cwd(), "public", "video-catalog", "thumbnails");

const POSTERS = [
  { file: "Pony Tail Girl.mp4", poster: "hero.webp" },
  { file: "Day in Life-3-6YRS.mp4", poster: "primary.webp" },
  { file: "Farm Day.mp4", poster: "farm.webp" },
  { file: "Drone Lab.mp4", poster: "drone.webp" },
  { file: "Red Sweater Kid.mp4", poster: "discovery.webp" },
  { file: "BB-Primary.mp4", poster: "primary-env.webp" },
  { file: "BB-Elementary.mp4", poster: "elementary.webp" },
  { file: "BB-erdkinder.mp4", poster: "erdkinder.webp" },
  { file: "Founders at BB.mp4", poster: "founders.webp" },
  { file: "Teachers at BB.mp4", poster: "teachers.webp" },
  { file: "Parent Engagement at BB.mp4", poster: "parents.webp" },
  { file: "Safe Transport.mp4", poster: "transport.webp" },
];

function hasFfmpeg() {
  const result = spawnSync("ffmpeg", ["-version"], { stdio: "pipe" });
  return result.status === 0;
}

function linkOrCopy(from, to) {
  if (fs.existsSync(to)) {
    const fromStat = fs.statSync(from);
    const toStat = fs.statSync(to);
    if (fromStat.size === toStat.size) return "exists";
    fs.unlinkSync(to);
  }

  try {
    fs.linkSync(from, to);
    return "linked";
  } catch {
    fs.copyFileSync(from, to);
    return "copied";
  }
}

function syncVideos() {
  if (!fs.existsSync(SRC)) {
    console.warn(`video-catalog: source videos not found at ${SRC}`);
    console.warn("  Videos will 404 until the MP4s are placed in that folder.");
    return;
  }

  fs.mkdirSync(DEST, { recursive: true });
  const files = fs.readdirSync(SRC).filter((name) => /\.(mp4|webm|mov)$/i.test(name));
  if (!files.length) {
    console.warn("video-catalog: no video files found in source folder");
    return;
  }

  let linked = 0;
  let copied = 0;
  let skipped = 0;
  for (const file of files) {
    const result = linkOrCopy(path.join(SRC, file), path.join(DEST, file));
    if (result === "linked") linked += 1;
    else if (result === "copied") copied += 1;
    else skipped += 1;
  }
  console.log(
    `video-catalog: videos ready (${linked} linked, ${copied} copied, ${skipped} unchanged)`
  );
}

function syncPosters() {
  if (!hasFfmpeg()) {
    console.warn("video-catalog: ffmpeg not found; skipping poster generation");
    return;
  }

  fs.mkdirSync(THUMBS, { recursive: true });

  for (const item of POSTERS) {
    const input = path.join(DEST, item.file);
    const output = path.join(THUMBS, item.poster);
    if (!fs.existsSync(input)) continue;
    if (fs.existsSync(output) && fs.statSync(output).size > 1000) continue;

    const result = spawnSync(
      "ffmpeg",
      [
        "-y",
        "-ss",
        "1.5",
        "-i",
        input,
        "-frames:v",
        "1",
        "-vf",
        "scale=640:-2",
        output,
      ],
      { stdio: "pipe" }
    );

    if (result.status === 0 && fs.existsSync(output)) {
      console.log(`  poster ${item.poster}`);
    }
  }
}

syncVideos();
syncPosters();
