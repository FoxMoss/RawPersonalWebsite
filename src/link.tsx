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
> = function () {
    let curentMouseX = 0;
    let curentMouseY = 0;
    this.cx.mount = () => {
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
                        mobile={use(globalThis.mobile.mobile)}
                    >
                        {this.content()}
                    </Box>,
                );
            }}
        >
            {this.children}
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
> = function () {
    const link = css`
        text-decoration: underline;
        cursor: pointer;
    `;
    let curentMouseX = 0;
    let curentMouseY = 0;
    this.cx.mount = () => {
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
                        mobile={use(globalThis.mobile.mobile)}
                    >
                        <div
                            style={{
                                "min-width": use(globalThis.mobile.mobile).and(
                                    "auto").not().and(
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
            {this.children}
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
> = function () {
    let curentMouseX = 0;
    let curentMouseY = 0;
    this.cx.mount = () => {
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
                        mobile={use(globalThis.mobile.mobile)}
                    >
                        <div
                            style={{
                                "min-width": use(globalThis.mobile.mobile).and(
                                    "auto").not().and(
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
            {this.children}
        </span>
    );
};
SmallLink.style = css`
    :scope {
        text-decoration: underline;
        cursor: pointer;
    }
`;
