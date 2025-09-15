import { hydrate } from "dreamland/ssr/client";
import App from "./main";

window.addEventListener("load", () => {
    document.body.appendChild(App());
});
