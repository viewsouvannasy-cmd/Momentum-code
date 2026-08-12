import { FullLogo } from "../../components/logo/FullLogo";
import { Link } from "react-router";
import { useEffect } from "react";
import "./ErrorPage.css";

export function ErrorPage() {
  useEffect(() => {
    document.title = "error - 404";
  });

  return (
    <div className="container-error-page">
      <div className="card-error">
        <FullLogo />
        <h1>
          404
          <span>
            something was wrong{" "}
            <Link className="link" to="/app/inbox">
              Back To App
            </Link>
          </span>
        </h1>
      </div>
    </div>
  );
}
