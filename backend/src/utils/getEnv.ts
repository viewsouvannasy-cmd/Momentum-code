export function getPort(): string {
  const port = process.env.PORT;
  if (!port) {
    throw new Error("PORT is not set");
  }
  return port;
}

export function getNeonUrl(): string {
  const neonUrl = process.env.NEONDB_URL;
  if (!neonUrl) {
    throw new Error("Neon Url id not set");
  }
  return neonUrl;
}

export function getAccessTokenSecret(): string {
  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  if (!accessToken) {
    throw new Error("ACCESS_TOKEN_SECRET is not set");
  }
  return accessToken;
}

export function getRefreshTokenSecret(): string {
  const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshToken) {
    throw new Error("REFRESH_TOKEN_SECRET is not set");
  }
  return refreshToken;
}

export function getOtpTokenSecret(): string {
  const otpToken = process.env.OTP_TOKEN_SECRET;
  if (!otpToken) {
    throw new Error("OTP_TOKEN_SECRET is not set");
  }
  return otpToken;
}

export function getAppPassword(): string {
  const appPassword = process.env.APP_PASSWORD;
  if (!appPassword) {
    throw new Error("APP_PASSWORD is not set");
  }
  return appPassword;
}
