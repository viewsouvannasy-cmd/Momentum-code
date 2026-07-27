import { Link } from "react-router";
import "./HeaderAuth.css";

export function HeaderAuth() {
  return (
    <div className="container-header-auth">
      <Link className="container-logo" to="/">
        <img src="/logo/logo-momentum-black.png" />
        <p>Momentum</p>
      </Link>
    </div>
  );
}
