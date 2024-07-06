import {
    backgroundColor,
    lightColor,
    textColor,
} from "./colors";

export const Row: Component<{}, { children: JSX.Element }> = function () {
    this.css = `
    display: flex;
    justify-content:center;
    align-items:center;
`;
    return <div>{this.children}</div>;
};

export const Box: Component<
    { x: number; y: number; z: number },
    { children: JSX.Element }
> = function () {
    this.css = `
      position: absolute;
    `;
    const main = css`
        position: relative;
        padding: 20px;
        user-select: none;
        background-color: ${lightColor};
        color: ${textColor};
        font-family: "Exo 2", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        border-radius: 10px;
        border: 2px solid ${backgroundColor};
        display: flex;
        ${this.z != 0 ? `transform: translate(-50%, -10px);` : ""}
    `;
    const content = css`
    `;
    const close = css`
        cursor: pointer;
        padding: 10px;
    `;

    let mouseOver = false;
    let captured = false;
    this.mount = () => {
        (this.root.children[0] as HTMLDivElement).addEventListener(
            "mouseenter",
            () => {
                mouseOver = true;
            },
        );
        (this.root.children[0] as HTMLDivElement).addEventListener(
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
        <div>
            <div
                class={main}
                style={{
                    top: use`${this.y}px`,
                    left: use`${this.x}px`,
                    zIndex: use(this.z, () => this.z.toString()),
                }}
            >
                <div class={content}>{this.children}</div>
                {$if(
                    this.z != 0,
                    <div class={close} on:click={() => this.root.remove()}>
                        X
                    </div>,
                )}
            </div>
        </div>
    );
};
