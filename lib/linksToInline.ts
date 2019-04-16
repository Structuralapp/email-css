import * as css from "css";
import { linksToAny, LinksToAnyOptions } from "./linksToAny";

export async function linksToInline(options: LinksToAnyOptions): Promise<string> {
  return linksToAny({
    ...options,
    resolveStyle: ($, style) => {
      const styles = css.parse(style).stylesheet;
      if (!styles) { return; }
      const rules: css.Rule[] = styles.rules.filter((r) => r.type === "rule");
      for (const rule of rules) {
        applyRule($, rule);
      }
      $("style").remove();
    },
  });
}

function applyRule($: ReturnType<(typeof cheerio)["load"]>, rule: css.Rule) {
  if (!rule.declarations || !rule.selectors) { return; }
  const declarations: {[key: string]: string} = {};
  for (const { property, value } of rule.declarations as css.Declaration[]) {
    if (!property || !value) { continue; }
    declarations[property] = value;
  }
  for (const selector of rule.selectors) {
    $(selector).css(declarations);
  }
}
