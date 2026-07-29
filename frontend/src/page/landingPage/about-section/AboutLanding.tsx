import "./AboutLanding.css";
import useToggleTheme from "../../../store/theme/useToggleTheme.ts";
export function AboutLanding() {
  const { themeColor } = useToggleTheme();

  return (
    <>
      <div className="container-show-process-main">
        <img src={`/background-image-${themeColor}-landing.png`} />
        <div className="background-shadow"></div>
        <div className="container-show-process">
          <div className="box-process">
            <div>
              <p>I WILL DO IT</p>
              <div className="to-do-card-landing">
                <div className="circle"></div>
                <div>
                  <span>To Do</span>
                  <p>I will make a super cool project to my portfolio</p>
                </div>
              </div>
            </div>
            <div>
              <p>I DOING IT</p>
              <div className="doing-card-landing">
                <div className="circle"></div>
                <div>
                  <span>Doing</span>
                  <p>I will make a super cool project to my portfolio</p>
                </div>
              </div>
            </div>
            <div>
              <p>I COMPLETE IT</p>
              <div className="done-card-landing">
                <div className="circle"></div>
                <div>
                  <span>DONE</span>
                  <p>I will make a super cool project to my portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- this is sturcture from about section ------  */}

      <div className="container-about-section-main">
        <h2>What's Momentum?</h2>
        <div className="container-card-about-and-why">
          <div>
            <p>Why Momentum exist?</p>
            <div className="box-wrap-text">
              <span>
                I didn't build Momentum because I needed another place to write
                down tasks. I already had that. What I didn't have was any sense
                of how far I'd actually come.
                <br />
                <br /> I'd check things off, day after day, and by the end of
                the week I couldn't tell you if I'd made progress or just spun
                in place. The list emptied and refilled like nothing had
                happened. There was no shape to it — no sense of building toward
                anything. Just tasks, done, gone, forgotten.
                <br />
                <br /> What I actually wanted wasn't a better list. It was a way
                to see my own follow-through — to watch the small, ordinary act
                of finishing something turn into visible motion, day over day.
                Not a guilt trip when I missed a day. Not a static checklist.
                Something that made progress feel real, because I could see it
                happening.
                <br />
                <br />
                That's what Momentum is. Every task you finish doesn't just
                disappear — it becomes part of a visible, building motion. A
                meter that fills. A streak that bends instead of breaking. A
                shape to your effort you can actually look back on.
                <br />
                <br />I built it for myself first — for anyone trying to build
                better habits and tired of progress that never felt like
                progress at all.
              </span>
            </div>
          </div>
          <div>
            <p>About</p>
            <div className="box-wrap-text">
              <span>
                This app helps you manage your daily tasks in an organized way —
                whether big or small. Add, prioritize, and track your progress
                easily, all in one place. Designed to be simple and fast, it
                helps you focus on what matters most.
              </span>
            </div>
          </div>
        </div>
        <div className="point" id="about-section"></div>
      </div>
    </>
  );
}
