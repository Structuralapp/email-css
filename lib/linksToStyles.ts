import { linksToAny, LinksToAnyOptions } from "./linksToAny";

export async function linksToStyles(options: LinksToAnyOptions): Promise<string> {
  return linksToAny({
    ...options,
    resolveStyle: ($, style) => {
      $("head").append(`<style>\n${style}\n</style>`);
    },
  });
}
