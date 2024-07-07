import "dreamland/dev";
import "./index.css";
import { Box, Row } from "./box";
import { Link } from "./link";
import { AboutMe, Animate, Buttons } from "./about-me";
import { NavBar } from "./navbar";
import { backgroundColor, lightColor, textColor } from "./colors";

const App: Component<{}, {}> = function () {
    this.css = `
      height: 100vh;
    `;

    return (
        <div>
            <NavBar />
        </div>
    );
};
export const Blog: Component<{}, {}> = function () {
    let main = css`
        background-color: ${lightColor};
        color: ${textColor};
        font-optical-sizing: auto;
        font-style: normal;
        border-radius: 10px;
        border: 2px solid ${backgroundColor};
        margin: 10px;
        padding: 10px;
    `;
    return (
        <div>
            <Row>
                <div class={main}>Nothing here yet...</div>
            </Row>
        </div>
    );
};

export const Personal: Component<{}, {}> = function () {
    const spin = css`
        width: 100px;
        float: right;
        border-radius: 10px;
        margin: 10px;
    `;
    const boxHub = css`
        position: absolute;
        top: 0;
        left: 0;
    `;
    const predisplayed = css`
        margin-top: 150px;
    `;

    return (
        <div>
            {" "}
            <div id="boxHub" class={boxHub} />
            <div class={predisplayed}>
                <Row>
                    <Box x={0} y={0} z={0}>
                        <div style={{ width: "400px" }}>
                            <h1>
                                Hello.
                                <Link content={Animate}>
                                    <img class={spin} src="/pfp.png" />
                                </Link>
                            </h1>
                            <div>I am foxmoss.</div>
                            <br />
                            <ul>
                                <li>
                                    <Link content={AboutMe}>About Me</Link>
                                </li>
                                <li>
                                    <Link content={Buttons}>
                                        88x31 Web Buttons
                                    </Link>
                                </li>
                            </ul>
                            <br />
                            <div>
                                Note: All external links will be clearly marked
                                and will not reload/replace this tab.
                            </div>
                        </div>
                    </Box>
                </Row>
            </div>
        </div>
    );
};

window.addEventListener("load", () => {
    document.getElementById("app")!.replaceWith(<App />);
});
