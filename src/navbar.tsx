import { Row } from "./box";
import { backgroundColor, lightColor } from "./colors";
import { Blog, Personal } from "./main";

export const NavBar: Component<
    {},
    {
        pages: Record<string, { name: string; page: Component<any, any> }>;
        path: string;
    }
> = function () {
    this.path = new URL(document.URL).pathname;
    useChange(this.path, () => {
        let url = new URL(document.URL);
        url.pathname = this.path;
        window.history.pushState("", "FoxMoss", url.toString());
    });
    this.pages = {
        "/": { name: "Personal", page: Personal },
        "/blog": { name: "Blog", page: Blog },
    };
    this.css = `
        margin: 5px;
    `;
    const bar = css`
        background: ${lightColor};
        padding: 4px;
        border-radius: 10px;
        margin: 5px;
        cursor: pointer;
    `;
    const selected = css`
        background: ${backgroundColor};
        border: 2px solid ${lightColor};
        color: ${lightColor};
        padding: 4px;
        border-radius: 10px;
        margin: 5px;
    `;

    return (
        <div>
            <Row>
                {use(this.path, () =>
                    Object.entries(this.pages).map((val) => (
                        <span
                            class={val[0] === this.path ? selected : bar}
                            on:click={() => {
                                this.path = val[0];
                            }}
                        >
                            {val[1].name}
                        </span>
                    )),
                )}
            </Row>
    {use(this.path, () => this.pages[this.path].page(this))}

        </div>
    );
};
