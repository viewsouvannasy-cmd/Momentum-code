import { fetchRefreshToken } from "../../api/auth.ts";

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function saveAccessToken(value: string) {
  accessToken = value;
}

export function claearAccessToken() {
  accessToken = null;
}

export const checkAccessToken = async () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    const newToken = await fetchRefreshToken();
    return newToken;
  }

  return accessToken;
};
