"use strict";
const assert = require("chai").assert;
const describe = require("mocha-sugar-free").describe;
const it = require("mocha-sugar-free").it;

const jsdom = require("../../lib/newapi1.js");

describe("newapi1 basic functionality", () => {
  it("should have a window and a document", () => {
    const dom = jsdom();

    assert.isOk(dom.window);
    assert.isOk(dom.window.document);
  });

  it("should have a document with documentElement <html> when no arguments are passed", () => {
    const document = jsdom().window.document;

    assert.strictEqual(document.documentElement.localName, "html");
  });
});

describe("newapi1 first argument", () => {
  it("should populate the resulting document with the given HTML", () => {
    const document = jsdom(`<a id="test" href="#test">`).window.document;

    assert.strictEqual(document.getElementById("test").getAttribute("href"), "#test");
  });

  it("should give the same document innerHTML for empty and whitespace and omitted strings", () => {
    const document1 = jsdom().window.document;
    const document2 = jsdom(undefined).window.document;
    const document3 = jsdom(``).window.document;
    const document4 = jsdom(` `).window.document;

    assert.strictEqual(document1.innerHTML, document2.innerHTML);
    assert.strictEqual(document2.innerHTML, document3.innerHTML);
    assert.strictEqual(document3.innerHTML, document4.innerHTML);
  });
});
