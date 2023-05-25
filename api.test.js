import { describe, before, after, it } from "node:test";
import { deepStrictEqual, ok } from "node:assert";

const BASE_URL = "http://localhost:3000";

describe("API Workflow", () => {
  let _server = {};
  before(async () => {
    _server = (await import("./api.js")).app;
    await new Promise((resolve) => _server.once("listening", resolve));
  });

  after((done) => _server.close(done));

  it("should receive not authorized when given wrong credentials", async () => {
    const data = {
      user: "juliano",
      password: "secret1234",
    };

    const request = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    deepStrictEqual(request.status, 401);

    const response = await request.json();
    deepStrictEqual(response, { error: "wrong credentials" });
  });

  it("should login successfuly when given correct credentials", async () => {
    const data = {
      user: "juliano",
      password: "123",
    };

    const request = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    deepStrictEqual(request.status, 200);

    const response = await request.json();
    ok(response.token, 'token should be present')
  });
});
