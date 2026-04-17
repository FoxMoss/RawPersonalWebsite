import { type ComponentChild, css, type Component } from "dreamland/core";
import { Row } from "./box";
import { backgroundColor, lightColor } from "./colors";
import { Personal } from "./main";

const Blog: Component<{}, {}> = function () {
    return <div></div>;
};

export const NavBar: Component<
    { url:string, mobile: boolean },
    {
        pages: Record<string, { name: string; page: ComponentChild }>;
        path: string;
    }
> = function () {
    this.path = "/";

    this.pages = {
        "/": { name: "Personal", page: <Personal mobile={use(this.mobile)} /> },
        "/blog/": { name: "Blog", page: <Blog /> },
    };

    return (
        <div>
            <Row mobile={use(this.mobile)}>
                {
                    Object.keys(this.pages).map((key) => {
                        let val = this.pages[key];

                        return (
                            <span
                                class={use(this.mobile).and(
                                    "mobile " +
                                        (key === this.path
                                            ? "mobileSelected"
                                            : "mobileBar")).or(
                                    key === this.path
                                        ? "desktopSelected"
                                        : "desktopBar",
                                )}
                                on:click={() => {
                                  window.location.assign(key);

                                }}
                            >
                                {val.name}
                            </span>
                        );
                    })}
                   
            </Row>
            {use(this.path).map((path) => this.pages[path].page)
            }
        </div>
    );
};

NavBar.style = css`
    :scope {
    }
    .desktopBar {
        background: ${lightColor};
        padding: 4px;
        border-radius: 10px;
        margin: 5px;
        cursor: pointer;
    }
    .desktopSelected {
        background: ${backgroundColor};
        border: 2px solid ${lightColor};
        color: ${lightColor};
        padding: 4px;
        border-radius: 10px;
        margin: 5px;
    }
    .mobileBar {
        background: ${lightColor};
        padding: 4px;
        border-radius: 0px;
        margin: 5px;
        cursor: pointer;
    }
    .mobileSelected {
        background: ${backgroundColor};
        border: 2px solid ${lightColor};
        color: ${lightColor};
        padding: 4px;
        border-radius: 0px;
        margin: 5px;
    }
`;
