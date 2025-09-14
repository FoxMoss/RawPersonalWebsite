import { css, type Component, type ComponentChild } from "dreamland/core";
import { Box } from "./box";

let zInc = 1;
export const Link: Component<
    { content: () => ComponentChild; children: ComponentChild | string },
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
                    <Box x={curentMouseX} y={curentMouseY} z={zInc++}>
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
    { href: string; children: ComponentChild | string },
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
                    <Box x={curentMouseX} y={curentMouseY} z={zInc++}>
                        <div
                            style={{ "min-width": "400px", "text-decoration": "underline", "cursor": "pointer", "padding": "10px"}}
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
    { content: string; children: ComponentChild | string },
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
                    <Box x={curentMouseX} y={curentMouseY} z={zInc++}>
                        <div style={{ "min-width": "400px" }}>
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
