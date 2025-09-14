import { css, type Component, type ComponentChild } from "dreamland/core";
import { Box } from "./box";

let zInc = 1;
export const Link: Component<
    {
        content: () => ComponentChild;
        children: ComponentChild | string;
        mobile?: boolean;
    },
    {}
> = function (cx) {
    let curentMouseX = 0;
    let curentMouseY = 0;
    cx.mount = () => {
        document.addEventListener("mousemove", (mouse) => {
            curentMouseX = mouse.x;
            curentMouseY = mouse.y;
        });
    };
    return (
        <span
            on:click={() => {
                document.getElementById("boxHub")?.appendChild(
                    <Box
                        x={curentMouseX}
                        y={curentMouseY}
                        z={zInc++}
                        mobile={use(window.mobile.mobile)}
                    >
                        {this.content()}
                    </Box>,
                );
            }}
        >
            {cx.children}
        </span>
    );
};
Link.style = css`
    :scope {
        text-decoration: underline;
        cursor: pointer;
    }
`;
export const RealLink: Component<
    { href: string; children: ComponentChild | string; mobile?: boolean },
    {}
> = function (cx) {
    const link = css`
        text-decoration: underline;
        cursor: pointer;
    `;
    let curentMouseX = 0;
    let curentMouseY = 0;
    cx.mount = () => {
        document.addEventListener("mousemove", (mouse) => {
            curentMouseX = mouse.x;
            curentMouseY = mouse.y;
        });
    };
    return (
        <span
            on:click={() => {
                document.getElementById("boxHub")?.appendChild(
                    <Box
                        x={curentMouseX}
                        y={curentMouseY}
                        z={zInc++}
                        mobile={use(window.mobile.mobile)}
                    >
                        <div
                            style={{
                                "min-width": use(window.mobile.mobile).andThen(
                                    "auto",
                                    "400px",
                                ),
                                "text-decoration": "underline",
                                "overflow-wrap": "anywhere",
                                cursor: "pointer",
                                padding: "10px",
                            }}
                            on:click={() => {
                                window.open(this.href, "_blank");
                            }}
                        >
                            Open {this.href} in new tab.
                        </div>
                    </Box>,
                );
            }}
        >
            {cx.children}
        </span>
    );
};

RealLink.style = css`
    :scope {
        text-decoration: underline;
        cursor: pointer;
    }
`;
export const SmallLink: Component<
    { content: string; children: ComponentChild | string; mobile?: boolean },
    {}
> = function (cx) {
    let curentMouseX = 0;
    let curentMouseY = 0;
    cx.mount = () => {
        document.addEventListener("mousemove", (mouse) => {
            curentMouseX = mouse.x;
            curentMouseY = mouse.y;
        });
    };
    return (
        <span
            on:click={() => {
                document.getElementById("boxHub")?.appendChild(
                    <Box
                        x={curentMouseX}
                        y={curentMouseY}
                        z={zInc++}
                        mobile={use(window.mobile.mobile)}
                    >
                        <div
                            style={{
                                "min-width": use(window.mobile.mobile).andThen(
                                    "auto",
                                    "400px",
                                ),
                            }}
                        >
                            {this.content}
                        </div>
                    </Box>,
                );
            }}
        >
            {cx.children}
        </span>
    );
};
SmallLink.style = css`
    :scope {
        text-decoration: underline;
        cursor: pointer;
    }
`;
