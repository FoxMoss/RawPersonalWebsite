import { css, type Component, type ComponentChild } from "dreamland/core";
import { backgroundColor, lightColor, textColor } from "./colors";

export const Row: Component<
    {
        mobile: boolean;
        children: ComponentChild;
    },
    {}
> = function (cx) {
    return (
        <div class={use(this.mobile).andThen("mobile", "desktop")}>
            {cx.children}
        </div>
    );
};
Row.style = css`
    .desktop {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mobile {
        margin-top: 10px;
    }
`;

export const Box: Component<
    {
        x: number;
        y: number;
        z: number;
        children: ComponentChild;
        mobile: boolean;
    },
    {}
> = function (cx) {
    let mouseOver = false;
    let captured = false;
    cx.mount = () => {
        (cx.root.children[0] as HTMLDivElement).addEventListener(
            "mouseenter",
            () => {
                mouseOver = true;
            },
        );
        (cx.root.children[0] as HTMLDivElement).addEventListener(
            "mouseleave",
            () => {
                mouseOver = false;
            },
        );
    };
    document.addEventListener("mousedown", () => {
        if (mouseOver) {
            captured = true;
        }
    });
    document.addEventListener("mouseup", () => {
        captured = false;
    });
    document.addEventListener("mousemove", (mouse: MouseEvent) => {
        if (captured) {
            this.x = this.x + mouse.movementX;
            this.y = this.y + mouse.movementY;
        }
    });

    return (
        <div class={use(this.mobile).andThen("", "desktop")}>
            <div
                class={use(this.mobile).andThen("mobile", "main")}
                style={{
                    top: use(this.y).andThen(() => {
                        if (this.mobile) {
                            return "0px";
                        }
                        return `${this.y}px`;
                    }),
                    left: use(this.x).andThen(() => {
                        if (this.mobile) {
                            return "0px";
                        }
                        return `${this.x}px`;
                    }),
                    "z-index": use(this.z),
                    transform: use(this.z).listen(() => {
                        if (this.z == 0) {
                            return "";
                        }

                        return "translate(-50%, -10px);";
                    }),
                }}
            >
                <div>{cx.children}</div>
                {use(this.z).andThen(() => {
                    if (this.z == 0) {
                        return "";
                    }
                    return (
                        <div class="close" on:click={() => cx.root.remove()}>
                        {use(this.mobile).andThen("Close", "X")}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Box.style = css`
    .desktop {
        position: absolute;
    }
    .main {
        position: relative;
        padding: 20px;
        user-select: none;
        background-color: ${lightColor};
        color: ${textColor};
        font-optical-sizing: auto;
        font-style: normal;
        border-radius: 10px;
        border: 2px solid ${backgroundColor};
        display: flex;
    }
    .mobile {
        padding: 20px;
        background-color: ${lightColor};
        color: ${textColor};
        font-optical-sizing: auto;
        font-style: normal;
        border: 2px solid ${backgroundColor};
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .close {
        cursor: pointer;
        padding: 10px;
    }
    .mobile > .close {
        padding-top: 20px;
    }
`;
