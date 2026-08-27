import { it, describe, expect } from "vitest";
import {
  getAccessToken,
  saveAccessToken,
  claearAccessToken,
} from "./accessToken";

describe("token utils", () => {
  describe("getAccessToken / saveAccessToken / claearAccessToken", () => {
    it("returns null by default", () => {
      expect(getAccessToken()).toBeNull();
    });

    it("returns the saved token after saveAccessToken is called", () => {
      saveAccessToken("abc123");
      expect(getAccessToken()).toBe("abc123");
    });

    it("returns null after claearAccessToken is called", () => {
      saveAccessToken("abc123");
      claearAccessToken();
      expect(getAccessToken()).toBeNull();
    });
  });
});
