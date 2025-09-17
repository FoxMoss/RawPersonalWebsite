import { css, createState, type Component } from "dreamland/core";
import "./index.css";
import "./wm.css";
import { Box, Row } from "./box";
import { Link } from "./link";
import { AboutMe, Animate, Buttons, Contact } from "./about-me";
import { NavBar } from "./navbar";
import { backgroundColor, lightColor, textColor } from "./colors";

let url: string | undefined;

globalThis.mobile = createState({
    mobile: true,
});

const App: Component = function (cx) {
    cx.mount = () => {
        if (!import.meta.env.SSR) {
            globalThis.mobile.mobile = window.screen.width < 500;
        }
    };

    return (
        <div class={use(globalThis.mobile.mobile).andThen("mobile", "desktop")}>
            {use(globalThis.mobile.mobile).andThen(() => (
                <div
                    class="annoying"
                    on:click={() => {
                        globalThis.mobile.mobile = false;
                    }}
                >
                    You are viewing the mobile version of the site. Click me to
                    disable.{" "}
                </div>
            ))}

            <NavBar mobile={use(globalThis.mobile.mobile)} />
        </div>
    );
};
App.style = css`
    .mobile {
        height: 100vh;
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .desktop {
        max-height: 100vh;
        max-width: 100vw;
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
                            <div>
                                I am developer interested in networking and low
                                level programming.
                            </div>
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
                        </div>
                    </Box>
                </Row>
                {use(this.mobile).andThen(<div id="boxHub" class="mobileBox"/>)}
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
    .mobileBox {
      margin-bottom: 50vh;

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

export default (path?: string) => {
    url = path;
    return <App />;
};
