import axios from "axios";
import * as fs from "fs-extra";
import * as URL from "url";

export async function getBodyFromUrl(url: string): Promise<string> {
  const parsed = URL.parse(url);
  if ((parsed.protocol === "file:" || !parsed.protocol) && parsed.pathname) {
    return fs.readFile(parsed.pathname, "utf-8");
  } else {
    return (await axios.get(url)).data;
  }
}
