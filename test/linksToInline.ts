import { expect } from "chai";
import { linksToInline } from "../lib";

describe("linksToInline", () => {
  it("should work", async () => {
    const html = await linksToInline({
      url: "file://" + __dirname + "/assets/basic.html",
    });
    expect(html).to.equal(`<!DOCTYPE html><html lang="en"><head>
</head>
<body>
  <div class="foo" style="color: blue;">
    <div class="bar" style="color: red;"></div>
    <div class="foobar" style="color: purple;"></div>
  </div>
</body></html>`);
  });
});
