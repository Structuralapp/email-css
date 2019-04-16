import { expect } from "chai";
import { linksToStyles } from "..";

describe("linksToStyles", () => {
  it("should work", async () => {
    const html = await linksToStyles({
      url: "file://" + __dirname + "/assets/basic.html",
    });
    expect(html).to.equal(`<!DOCTYPE html><html lang="en"><head>
<style>
.foo {
  color: blue;
}
</style><style>
.foobar {
  color: purple;
}
.bar {
  color: red;
}
</style></head>
<body>
  <div class="foo">
    <div class="bar"></div>
    <div class="foobar"></div>
  </div>
</body></html>`);
  });
});
