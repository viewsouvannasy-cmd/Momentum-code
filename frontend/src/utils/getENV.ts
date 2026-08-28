export function getHostServer(): string {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  return serverHost;
}
