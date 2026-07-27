import { Link } from "react-router";
import "./FullLogo.css";

export function FullLogo() {
  return (
    <Link className="container-logo" to="/">
      <img src="/logo/logo-momentum-black.png" />
      <p>Momentum</p>
    </Link>
  );
}
