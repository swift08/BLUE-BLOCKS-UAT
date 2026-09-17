import rawHeaderSite from "./header-site.json";
import { normalizeMojibakeDeep } from "@/lib/content/text";

const headerSiteData = normalizeMojibakeDeep(rawHeaderSite);

export default headerSiteData;
