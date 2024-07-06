import { Box } from "./box";

let zInc = 1;
export const Link: Component<
    { content: () => JSX.Element },
    { children: JSX.Element | string }
> = function () {
    this.css = `
    text-decoration:underline;
    cursor: pointer;
  `;
    let curentMouseX = 0;
    let curentMouseY = 0;
    this.mount = () => {
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
            {this.children}
        </span>
    );
};
export const RealLink: Component<
    { href: string },
    { children: JSX.Element | string }
> = function () {
    const link = css`
        text-decoration: underline;
        cursor: pointer;
    `;
    let curentMouseX = 0;
    let curentMouseY = 0;
    this.mount = () => {
        document.addEventListener("mousemove", (mouse) => {
            curentMouseX = mouse.x;
            curentMouseY = mouse.y;
        });
    };
    return (
        <span
            class={link}
            on:click={() => {
                document.getElementById("boxHub")?.appendChild(
                    <Box x={curentMouseX} y={curentMouseY} z={zInc++}>
                        <div
                            class={link}
                            style={{ minWidth: "400px" }}
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
export const SmallLink: Component<
    { content: string },
    { children: JSX.Element | string }
> = function () {
    const link = css`
        text-decoration: underline;
        cursor: pointer;
    `;
    let curentMouseX = 0;
    let curentMouseY = 0;
    this.mount = () => {
        document.addEventListener("mousemove", (mouse) => {
            curentMouseX = mouse.x;
            curentMouseY = mouse.y;
        });
    };
    return (
        <span
            class={link}
            on:click={() => {
                document.getElementById("boxHub")?.appendChild(
                    <Box x={curentMouseX} y={curentMouseY} z={zInc++}>
                        <div style={{ minWidth: "400px" }}>{this.content}</div>
                    </Box>,
                );
            }}
        >
            {this.children}
        </span>
    );
};
