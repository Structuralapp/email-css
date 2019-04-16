# email-css

Takes all `<link rel="stylesheet">` tags in an HTML document and inlines them as `<style>` tags.

Useful for automatically inlining CSS in an email.

## Usage

Install: `npm i email-css`

```typescript
import { linksToStyles } from "email-css";

async function example() {
  // can use linksToInline() too
  console.log(await linksToStyles({
    url: "https://google.com"
  }));
  console.log(await linksToStyles({
    html: fs.readFileSync("./example.html", "utf-8"),
    rootUrl: "."
  }));
}
```
