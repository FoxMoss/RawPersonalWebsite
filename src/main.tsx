import { css, type Component } from "dreamland/core";
import "./index.css";
import "./wm.css";
import { Box, Row } from "./box";
import { Link } from "./link";
import { AboutMe, Animate, Buttons, Contact } from "./about-me";
import { NavBar } from "./navbar";

const App: Component<{}, {}> = function () {
    return (
        <div>
            <NavBar/>
        </div>
    );
};
App.style = css`
:scope{

    height: 100vh;
}
`;

export const Personal: Component<{}, {}> = function () {
    return (
        <div>
            {" "}
            <div id="boxHub" class="boxHub" />
            <div class="predisplayed">
                <Row>
                 <Box x={0} y={0} z={0}>
                        <div style={{ width: "400px" }}>
                            <h1>
                                Hello.
                                <Link content={Animate}>
                                    <img class="spin" src="/pfp.png" />
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
                                <li>
                                    <Link content={Contact}>
                                        Other Platforms
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

Personal.style = css`
    .spin {
        width: 100px;
        float: right;
        border-radius: 10px;
        margin: 10px;
    }
    .boxHub {
        position: absolute;
        top: 0;
        left: 0;
    }
    .predisplayed {
        margin-top: 150px;
    }
`;

window.addEventListener("load", () => {
    document.body.appendChild(<App />);
});
