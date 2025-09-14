import { ComponentChild, css, type Component } from "dreamland/core";
import { Row } from "./box";
import { backgroundColor, lightColor } from "./colors";
import { Personal } from "./main";

const Blog: Component<{}, {}> = function () {
    return <div></div>;
};

export const NavBar: Component<
    {},
    {
        pages: Record<string, { name: string; page: ComponentChild}>;
        path: string;
    }
> = function () {
    this.path = new URL(document.URL).pathname;
    use(this.path).listen(() => {
        let url = new URL(document.URL);
        url.pathname = this.path;
        if (window.location.toString() != url.toString()) {
            window.location.assign(url);
        }
    });
    this.pages = {
        "/": { name: "Personal", page: <Personal /> },
        "/blog/": { name: "Blog", page: <Blog /> },
    };

    return (
        <div>
            <Row>
                {use(this.path).andThen(() =>
                    Object.keys(this.pages).map((key) => {
                        let val = this.pages[key];

                        return (
                            <span
                                class={key === this.path ? "selected" : "bar"}
                                on:click={() => {
                                    this.path = key;
                                }}
                            >
                                {val.name}
                            </span>
                        );
                    })
                )}
            </Row>
            {use(this.path).andThen(() => this.pages[this.path].page)}
        </div>
    );
};

NavBar.style = css`
:scope {

    margin: 5px;
}
    .bar {
        background: ${lightColor};
        padding: 4px;
        border-radius: 10px;
        margin: 5px;
        cursor: pointer;
    }
    .selected {
        background: ${backgroundColor};
        border: 2px solid ${lightColor};
        color: ${lightColor};
        padding: 4px;
        border-radius: 10px;
        margin: 5px;
    }
`;
