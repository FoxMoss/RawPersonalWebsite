import { Row } from "./box";
import { backgroundColor, lightColor, textColor } from "./colors";

const blogPosts = [
    {
        name: "User fingerprinting with Markov chains",
        author: "FoxMoss",
        link: "/blog/foxkov.html",
        date: "Wed Jul 24 12:56:53 AM CDT 2024",
    },
];

export const Blog: Component<{}, {}> = function () {
    // background-color: ${lightColor};
    let main = css`
        color: ${textColor};
        font-optical-sizing: auto;
        font-style: normal;
        border-radius: 10px;
        border: 2px solid ${backgroundColor};
        padding: 2em;
        width: 90vw;
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
    const postFormat = css`
        background-color: ${lightColor};
        padding: 2vh;
        cursor: pointer;
        border-radius: 10px;
    `;
    return (
        <div>
            <Row>
                <div class={main}>
                    {blogPosts.map((post) => (
                        <div
                            class={postFormat}
                            on:click={() => {
                                window.location.pathname = post.link;
                            }}
                        >
                            {post.name} by {post.author}{" "}
                            <div style={{ float: "right" }}>{post.date}</div>
                        </div>
                    ))}
                </div>
            </Row>
        </div>
    );
};
