import { defineConfig, UserConfig } from "vite";
import { resolve } from "path";
import { dreamlandPlugin } from "vite-plugin-dreamland";

export default defineConfig({
    plugins: [dreamlandPlugin()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                foxkov: resolve(__dirname, "blog/foxkov.html"),
            },
        },
    },
});
