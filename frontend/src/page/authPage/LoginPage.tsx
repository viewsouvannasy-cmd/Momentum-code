import { Link } from "react-router";
import "./authPage.css";

export function LoginPage() {
  return (
    <div className="container-background-image login">
      <img src="/background-image.png" />
      <div>
        <div className="container-card-form-and-title login">
          <div>
            <h1>Log in</h1>
            <span>Pick up right where you left off.</span>
          </div>
          <form>
            <label>Name</label>
            <input type="text" placeholder="Your name" required />
            <label>Password</label>
            <input type="text" placeholder="••••••••" required />
            <button type="submit">Log in</button>
          </form>
          <p>
            Don't have an account?
            <Link to="/sign" className="link-to-sign-up-login">
              Sign up
            </Link>
          </p>
        </div>
        <div className="container-logo">
          <img src="/logo/logo-momentum-black.png" />
          <p>Momentum</p>
        </div>
      </div>
    </div>
  );
}
