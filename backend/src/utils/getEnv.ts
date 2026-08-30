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

export function getSendGridApiKey(): string {
  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendGridApiKey) {
    throw new Error("SENDGRID_API_KEY is not set");
  }
  return sendGridApiKey;
}

export function getCloudinaryName(): string {
  const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudinaryName) {
    throw new Error("CLOUDINARY_CLOUD_NAME  is not set");
  }
  return cloudinaryName;
}

export function getCloudinaryApi(): string {
  const cloudinaryApi = process.env.CLOUDINARY_API;
  if (!cloudinaryApi) {
    throw new Error("CLOUDINARY_API is not set");
  }
  return cloudinaryApi;
}

export function getCloudinarySecsetKey(): string {
  const cloudinarySecreyKey = process.env.CLOUDINARY_SECRET_KEY;
  if (!cloudinarySecreyKey) {
    throw new Error("CLOUDINARY_SECRET_KEY is not set");
  }
  return cloudinarySecreyKey;
}

export function getResetPasswordToken(): string {
  const resetPasswordToken = process.env.RESET_PASSWORD_TOKEN_SECRET;
  if (!resetPasswordToken) {
    throw new Error("RESET_PASSWORD_TOKEN_SECRET  is not set");
  }

  return resetPasswordToken;
}

export function getClientHost(): string {
  const clientHost = process.env.CLIENT_HOST;
  if (!clientHost) {
    throw new Error("CLIENT_HOST is not set");
  }
  return clientHost;
}

export function getServerHost(): string {
  const serverHost = process.env.SERVER_HOST;
  if (!serverHost) {
    throw new Error("SERVERHOST is not set");
  }

  return serverHost;
}

export function getNodeMode(): string {
  const nodeMode = process.env.NODE_MODE;
  if (!nodeMode) {
    throw new Error("NODE_MODE is not set");
  }

  return nodeMode;
}
