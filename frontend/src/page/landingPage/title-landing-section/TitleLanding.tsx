import { Link } from "react-router";
import "./TitleLanding.css";

export function TitleLanding() {
  return (
    <div className="container-title-landing-main">
      <div className="container-title-landing">
        <h1>
          <span className="normal-text">every list you done </span>{" "}
          <span className="hightlight-text one">Builds</span>
          <span className="hightlight-text two"> Momentum</span>{" "}
          <span className="normal-text">for next one</span>
        </h1>
        <p>
          Momentum is to-do list that turns your completed
          <br /> tasks into your next big motivation. No guilt, no clutter
          <br /> (just pure forward motion).
        </p>
        <div>
          <Link className="link-how-it-work" to="/sign">
            How it Work
          </Link>
          <Link className="link-get-start" to="/sign">
            Get Start
          </Link>
        </div>
      </div>
      <div className="point" id="home-section"></div>
    </div>
  );
}
