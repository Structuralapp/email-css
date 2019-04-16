import * as cheerio from "cheerio";
import * as path from "path";
import { getBodyFromUrl } from "./getBodyFromUrl";
import { resolveStyleBody } from "./resolveStyleBody";

export type LinksToAnyOptions = {
  url: string;
} | {
  html: string;
  rootUrl: string;
};

export async function linksToAny(options: LinksToAnyOptions & {
  resolveStyle: (root: CheerioStatic, styles: string) => void,
}): Promise<string> {
  let html = "";
  let rootUrl = "";
  if ("url" in options) {
    html = await getBodyFromUrl(options.url);
    rootUrl = path.dirname(options.url);
  } else {
    html = options.html;
    rootUrl = options.rootUrl;
  }
  const $ = cheerio.load(html);
  const links = $("link[rel='stylesheet']");
  const urls = links.toArray().map((e) => path.join(rootUrl, e.attribs.href));
  (await Promise.all(urls.map(resolveStyleBody))).forEach((s) => options.resolveStyle($, s));
  links.remove();
  return $.html().split("\n").map((l) => l.trimRight()).join("\n").replace(/[\n]{2,}/g, "\n");
}
