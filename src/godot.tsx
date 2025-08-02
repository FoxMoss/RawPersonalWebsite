import { Row } from "./box";
import "dreamland/dev";
import "./index.css";
import { backgroundColor, lightColor, textColor } from "./colors";

// 

export const GodotBlog: Component<{}, {}> = function () {
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
                    <div>{/*{[*/}
<h1 id="breaking-godot-encyrption">Breaking Godot Encyrption</h1>
<h2 id="by-foxmoss">By FoxMoss</h2>
<h3 id="sun-feb-9-095631-pm-cst-2025">Sun Feb 9 09:56:31 PM CST 2025</h3>
<p>Something pissed my off the past weekend, it started off with a video. A game developer made a devlog talking about preventing cheating in a Godot game. Godot’s build system basically just packages your source files then ships that off to users in a bundle with a runner, so its fairly trivial to unpack a game if unencrypted. Confidant I could easily hack the game in an hour or to, I started down the rabbit hole. Projects like <a href="https://github.com/GDRETools/gdsdecomp">GDRE</a> exist to make the unpacking process near instant, if its encrypted you need to do a little more work. GDRE supports setting a key so all you have to do is get the key. <img src="/blog/godot/image1.png" alt="/blog/godot/image1.png" /> I started looking for ways to extract the key, when I saw the second thing that really pissed me off. <img src="/blog/godot/image2.png" alt="/blog/godot/image2.png" /> The Godot docs were calling me a <em>script kiddie</em>, and if I couldn’t break this encryption I was <strong>stupid</strong>. But, hi! If you’re a script kiddie you’re in the right place. You’re going to learn how to break encryption in your favorite Godot 4.3 game, and maybe if you read these words you learn something about assembly.</p>
<p>Just for demo, I’m using my own blank Godot game to crack with the example key. Before we open up Ghidra we need to understand how Godot does decryption, it uses <a href="https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.h#L107C20-L107C93">decrypt_cfb</a> and <a href="https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.h#L100C9-L100C23">set_encode_key</a> and it does that <a href="https://github.com/godotengine/godot/blob/master/core/io/file_access_encrypted.cpp#L90">here</a>. The two functions are really just wrappers for <a href="https://mbed-tls.readthedocs.io/en/latest/index.html">mbedtls</a> functions <a href="https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.cpp#L212C12-L212C36">mbedtls_aes_crypt_cfb128</a> and <a href="https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.cpp#L175C12-L175C34">mbedtls_aes_setkey_enc</a>. So I first wrote up a demo program that just used these functions in my own C++ to verify how it worked. When doing that, I had an idea I could just cross reference each function in Godot executable with a library copy of mbedtls to find where each mbedtls function had been compiled. The instructions won’t be exact since I didn’t want to bother with compiling the Godot runners myself with symbols turned on, but there’ll be enough context to make educated guesses. My first target was mbedtls_aesni_has_support because I made a guess that the CPUID instruction didn’t appear very frequently, and mbedtls_aesni_has_support is used in mbedtls_aes_setkey_enc. <img src="/blog/godot/image3.png" alt="/blog/godot/image3.png" /> Finally I find a function that matches what I’m looking for. <img src="/blog/godot/image4.png" alt="/blog/godot/image4.png" /> And using it is a function that looks familiar…. <img src="/blog/godot/image5.png" alt="/blog/godot/image5.png" /> The 0xc0, 0x100, and 0x80 constants were big indicators since 0x100 in decimal is 256 the same number that <a href="https://github.com/godotengine/godot/blob/36d90c73a843afa2807a0b8dcbfbf52bdb8a759c/core/io/file_access_encrypted.cpp#L90">gets passed through</a>. We’re basically done now. We now have a location where our key is going to be sent, we just need to hook into the location in GDB. The problem is the address Ghidra gives us isn’t the one that GDB lets us set a breakpoint at.</p>
<p>So we can instead set a breakpoint in a standard library function we know the location of. In GDB now we can see what the debugger thinks the address of the instruction is. <img src="/blog/godot/image6.png" alt="/blog/godot/image6.png" /> <img src="/blog/godot/image7.png" alt="/blog/godot/image7.png" /> <img src="/blog/godot/image8.png" alt="/blog/godot/image8.png" /> So we can breakpoint our target function now, and the Ghidra of the library shows us where our variables are going to be. <img src="/blog/godot/image9.png" alt="/blog/godot/image9.png" /> <img src="/blog/godot/image10.png" alt="/blog/godot/image10.png" /> Then we just keep cycling the function until one of the keys matches, or you could do more work to find out the specific decryption call you need. <img src="/blog/godot/image11.png" alt="/blog/godot/image11.png" /> Format and put that key into GDRE and voila, we have our unencrypted game files. <img src="/blog/godot/image12.png" alt="/blog/godot/image12.png" /></p>
<p>If you’re better with Ghidra feel free to email me tips and improvements at foxmoss@mediaology.com or on discord as foxmoss_ and I’ll add them here.</p>
<p>Credit to <a href="https://github.com/char-ptr/gdke">GDKE</a> who did very similar work before me.</p>
{/*]}*/}</div>
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
            <GodotBlog/>
        </div>
    );
};

window.addEventListener("load", () => {
    document.getElementById("app")!.replaceWith(<App />);
});
