import request from "supertest";

import app from "../../src/app";

describe("GET /api/products", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/products").expect(200);
  });
});
