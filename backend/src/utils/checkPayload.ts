export function checkPayload(user_id: number | undefined): number {
  if (!user_id) {
    throw new Error("user_id verify payload is not exist");
  }
  return user_id;
}
