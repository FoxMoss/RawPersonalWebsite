import { css, createState, type Component } from "dreamland/core";
import "./index.css";
import "./wm.css";
import { Box, Row } from "./box";
import { Link } from "./link";
import { AboutMe, Animate, Buttons, Contact } from "./about-me";
import { NavBar } from "./navbar";
import { backgroundColor, lightColor, textColor } from "./colors";

// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser#11381730
window.mobile = createState({
    mobile: false,
});

const App: Component<{}, { mobile: boolean }> = function () {
    use(this.mobile).listen(() => (window.mobile.mobile = this.mobile));
    this.mobile = typeof screen.orientation !== "undefined";
    return (
        <div class={use(this.mobile).andThen("", "desktop")}>
            {use(this.mobile).andThen(() => (
                <div
                    class="annoying"
                    on:click={() => {
                        this.mobile = false;
                    }}
                >
                    You are viewing the mobile version of the site. Click me to
                    disable.{" "}
                </div>
            ))}

            <NavBar mobile={use(this.mobile)} />
        </div>
    );
};
App.style = css`
    :scope {
        height: 100vh;
        overflow-x: hidden;
    }
    .desktop {
        overflow: hidden;
    }
    .annoying {
        text-align: center;
        font-size: large;
        background-color: black;
        color: white;
        padding: 10px;
        margin-bottom: 30px;
    }
`;

export const Personal: Component<
    {
        mobile: boolean;
    },
    {}
> = function () {
    return (
        <div>
            {" "}
            {use(this.mobile).andThen("", <div id="boxHub" class="boxHub" />)}
            <div class={use(this.mobile).andThen("", "predisplayed")}>
                <Row mobile={use(this.mobile)}>
                    <Box x={0} y={0} z={0} mobile={use(this.mobile)}>
                        <div
                            style={{
                                width: use(this.mobile).andThen(
                                    "auto",
                                    "400px",
                                ),
                            }}
                        >
                            <Link content={Animate} mobile={use(this.mobile)}>
                                <img
                                    class={use(this.mobile).andThen(
                                        "spinMobile",
                                        "spin",
                                    )}
                                    src="/pfp.png"
                                />
                            </Link>

                            <h1>Hello.</h1>
                            <div>I am foxmoss.</div>
                            <br />
                            <ul>
                                <li>
                                    <Link
                                        content={AboutMe}
                                        mobile={use(this.mobile)}
                                    >
                                        About Me
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        content={Buttons}
                                        mobile={use(this.mobile)}
                                    >
                                        88x31 Web Buttons
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        content={Contact}
                                        mobile={use(this.mobile)}
                                    >
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
                {use(this.mobile).andThen(<div id="boxHub" />)}
            </div>
        </div>
    );
};

Personal.style = css`
    .spin {
        width: 100px;
        border-radius: 10px;
        float: right;
        margin: 10px;
    }
    .spinMobile {
        width: 100px;
        border-radius: 10px;
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
