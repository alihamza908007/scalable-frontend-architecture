import { describe, it, expect } from "vitest";
import { apiClient, ApiError } from "./api-client";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";

describe("apiClient", () => {
  it("should make a successful GET request", async () => {
    server.use(
      http.get("*/api/test", () => {
        return HttpResponse.json({ message: "Success" });
      }),
    );

    const result = await apiClient.get<{ message: string }>("/api/test");
    expect(result.message).toBe("Success");
  });

  it("should throw an ApiError on failure", async () => {
    server.use(
      http.get("*/api/error", () => {
        return new HttpResponse(JSON.stringify({ message: "Not Found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );

    await expect(apiClient.get("/api/error")).rejects.toThrow(ApiError);
    await expect(apiClient.get("/api/error")).rejects.toThrow("Not Found");
  });

  it("should handle 401 Unauthorized", async () => {
    server.use(
      http.get("*/api/unauthorized", () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    await expect(apiClient.get("/api/unauthorized")).rejects.toThrow(
      "Unauthorized",
    );
  });
});
