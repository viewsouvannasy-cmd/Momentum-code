import { Link } from "react-router";
import useToggleTheme from "../../store/theme/useToggleTheme";
import "./FullLogo.css";

export function FullLogo() {
  const { themeColor } = useToggleTheme();
  return (
    <Link className="container-logo" to="/">
      <img
        src={`/logo/logo-momentum-${themeColor === "black" ? "white" : "black"}.png`}
      />
      <p>Momentum</p>
    </Link>
  );
}
