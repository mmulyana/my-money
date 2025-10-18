import Cookies from "js-cookie";
import ky from "ky";
import { redirectToLogin } from "./utils";

const api = ky.create({
  prefixUrl: "http://localhost:3000/api/",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("access_token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          let errorMessage = "Unknown error";
          try {
            const data = await response.json();
            errorMessage = (data as any)?.message || errorMessage;
          } catch {}

          if (
            response.status === 401 ||
            response.status === 403 ||
            [
              "Invalid token",
              "Token has expired",
              "Failed to authenticate request",
              "Authorization token is missing or malformed",
              "User not found or no longer active",
            ].includes(errorMessage)
          ) {
            console.warn("Auth error:", errorMessage);
            redirectToLogin();
          }
        }
      },
    ],
  },
});

export { api };
