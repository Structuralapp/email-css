import * as path from "path";
import * as URL from "url";

import { getBodyFromUrl } from "./getBodyFromUrl";

const regex = /\@import\ url\(['"]{1}([^'"]+)['"]{1}\)[\;]?/g;

export async function resolveStyleBody(styleUrl: string): Promise<string> {
  const body = await getBodyFromUrl(styleUrl);
  let match = regex.exec(body);
  const importUrls: string[] = [];
  while (match) {
    let importUrl = match[1];
    if (!URL.parse(importUrl).protocol) {
      importUrl = path.join(path.dirname(styleUrl), importUrl);
    }
    importUrls.push(importUrl);
    match = regex.exec(body);
  }
  return (await Promise.all(importUrls.map(resolveStyleBody)))
    .join("\n") + "\n" + body.replace(regex, "");
}
