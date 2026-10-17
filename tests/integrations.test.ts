import assert from "node:assert/strict";
import test from "node:test";
import { getValidatedBookingUrl } from "../src/config/integrations";

test("accepts only secure OpenTable URLs", () => {
  assert.equal(getValidatedBookingUrl("https://www.opentable.com/r/zaragoza"), "https://www.opentable.com/r/zaragoza");
  assert.equal(getValidatedBookingUrl("http://www.opentable.com/r/zaragoza"), null);
  assert.equal(getValidatedBookingUrl("https://example.com/r/zaragoza"), null);
  assert.equal(getValidatedBookingUrl("not-a-url"), null);
  assert.equal(getValidatedBookingUrl(""), null);
});

test("rejects misleading subdomains", () => {
  assert.equal(getValidatedBookingUrl("https://opentable.com.example.com/r/zaragoza"), null);
});
