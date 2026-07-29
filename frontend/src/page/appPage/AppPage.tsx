import { handleLogout } from "../../store/auth/logout.ts";

export function AppPage() {
  handleLogout();
  return <div>hello</div>;
}
