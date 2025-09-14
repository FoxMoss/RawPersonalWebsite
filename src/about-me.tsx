import { css, type Component } from "dreamland/core";
import { Link, RealLink, SmallLink } from "./link";

export const AboutMe = () => (
    <div
        style={{
            "min-width": use(window.mobile.mobile).andThen("auto", "300px"),
        }}
    >
        <h2>About Me</h2>
        <div>
            You probably know me from my various programming projects or from
            being in some nerdy comunity.
        </div>
        <br />
        <br />
        <h4>Notable Projects</h4>
        <ul>
            <li>
                <Link content={Wisp}>Wisp</Link>
            </li>
        </ul>
        <br />
        <h4>Other Interests</h4>
        <ul>
            <li>Game Development</li>
            <li>Music Production</li>
            <li>
                <Link content={Kpop}>Kpop</Link>
            </li>
        </ul>
    </div>
);
export const Kpop = () => (
    <div
        style={{
            "min-width": use(window.mobile.mobile).andThen("auto", "400px"),
        }}
    >
        <h2>Kpop</h2>
        <div>
            I mostly listen to girl groups, mostly NewJeans and Le Sseraphim.
            I'm not really deep into the community, I just like the music :P
        </div>
    </div>
);

export const Animate = () => (
    <img style={{ "border-radius": "10px" }} src="/spin.gif" />
);
export const Wisp = () => (
    <div
        style={{
            "min-width": use(window.mobile.mobile).andThen("auto", "400px"),
        }}
    >
        <h2>Wisp</h2>
        <div>
            Wisp is a proxing protocol, similar to socks5 and bare. It is meant
            for multiplexing streams of TCP and UDP traffic through a websocket,
            though has found use in other applications.
        </div>
        <br />
        <div>
            I created{" "}
            <RealLink href="http://github.com/MercuryWorkshop/Woeful">
                Woeful
            </RealLink>
            , and helped develop out the{" "}
            <RealLink href="https://github.com/MercuryWorkshop/wisp-protocol">
                Wisp protocol
            </RealLink>
            .
        </div>
    </div>
);
export const Mediaology = () => (
    <div
        style={{
            "min-width": use(window.mobile.mobile).andThen("auto", "400px"),
        }}
    >
        <h2>Mediaology</h2>
        <div>
            Also known by other meaningless titles, such as "Moss News", "Fish
            Me", and relectuntantly "H311tak3r Unb10k3d U1timat3 Gam3s 666".
        </div>
        <br />
        <div>
            Mediaology is the now defunct unblocked game website. The URL you
            are curently on may have previously been used for hosting the late
            website.
        </div>
    </div>
);
export const Buttons = () => {
    return (
        <div
            style={{
                "min-width": use(window.mobile.mobile).andThen("auto", "400px"),
            }}
        >
            <h2>88x31 Web Buttons</h2>
            Here is my collection with links, or an acompanied explanation.
            <div style={{ display: "flex", gap: "8px", "flex-wrap": "wrap" }}>
                <Link content={DreamlandButton}>
                    <img src="/dreamland.png" />
                </Link>
                <RealLink href="https://anybrowser.org/campaign/index.html/">
                    <img src="/any-browser.png" />
                </RealLink>
                <SmallLink content="This is my button, I license under Creative Commons 0. Feel free to use it on your own site.">
                    <img src="/foxmossbutton.png" />
                </SmallLink>
                <RealLink href="https://velzie.rip/">
                    <img src="https://velzie.rip/88x31.png" />
                </RealLink>
                <RealLink href="https://bomberfish.ca/">
                    <img src="/bomberfish.gif" />
                </RealLink>
            </div>
        </div>
    );
};
export const DreamlandButton = () => {
    return (
        <div
            style={{
                "min-width": use(window.mobile.mobile).andThen("auto", "400px"),
            }}
        >
            I also made this button! Creative Commons 0 if you would like to use
            it. It is for the{" "}
            <RealLink href="https://dreamland.js.org/">
                Dreamland Javascript Framework
            </RealLink>
            which was used to create this site.
        </div>
    );
};
export const Contact = () => {
    return (
        <div>
            <div>
                Discord: <pre>foxmoss_</pre>
            </div>
            <div>
                Email Address: <pre>foxmoss@mediaology.com</pre>
            </div>
            <div>
                Monero:{" "}
                <div
                    style={{
                        "font-size": "x-small",
                        "max-width": "20vw",
                        display: "block",
                        "overflow-wrap": "anywhere",
                        cursor: "pointer",
                    }}
                    on:click={() => {
                        navigator.clipboard.writeText(
                            "49A955UvYmEBWWTXcxe3vd7YnBpGa85hu88Gx1TrJpELFb6QNLapTJ1SAtVMqrwFePBdnKgpgGdizPsN5MCeDoEA6PF7HW1",
                        );
                        alert("Copied my Monero wallet address.");
                    }}
                >
                    49A955UvYmEBWWTXcxe3vd7YnBpGa85hu88Gx1TrJpELFb6QNLapTJ1SAtVMqrwFePBdnKgpgGdizPsN5MCeDoEA6PF7HW1
                </div>
            </div>
        </div>
    );
};
