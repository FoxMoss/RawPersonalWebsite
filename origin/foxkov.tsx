import { Row } from "./box";
import "dreamland/dev";
import "./index.css";
import { backgroundColor, lightColor, textColor } from "./colors";

// @@gen = script.bash("echo '*/}'; find origin/blog/*.md | xargs -I % sh -c 'cat origin/blog/prepend && pandoc % && cat origin/blog/end'; echo '{/*'")

export const Foxkov: Component<{}, {}> = function () {
    let main = css`
        background-color: ${lightColor};
        color: ${textColor};
        font-optical-sizing: auto;
        font-style: normal;
        border-radius: 10px;
        border: 2px solid ${backgroundColor};
        padding: 2em;
        width: 90vw;
        height: 89vh;
        font-weight: 400;
        overflow-y: scroll;

        img {
            max-height: 40vh;
            max-width: 100%;
            margin-left: 5vw;
            margin-top: 1vh;
            border-radius: 10px;
            display: block;
        }
        p {
            margin-bottom: 1em;
        }
        figcaption {
            font-size: small;
        }
    `;
    return (
        <div>
            <Row>
                <div class={main}>
                    <div>{/*{[@(gen)]}*/}</div>
                </div>
            </Row>
        </div>
    );
};

const App: Component<{}, {}> = function () {
    this.css = `
      height: 100vh;
    `;
    const bar = css`
        background: ${lightColor};
        border-radius: 10px;
        margin: 1vh;
        padding: 1vh;
        cursor: pointer;
    `;

    return (
        <div>
            <Row>
                <div class={bar} on:click={()=>{location.pathname="/blog"}}>Blog</div>
            </Row>
            <Foxkov />
        </div>
    );
};

window.addEventListener("load", () => {
    document.getElementById("app")!.replaceWith(<App />);
});
