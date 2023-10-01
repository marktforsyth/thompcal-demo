import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["192.png", "512.png", "normal.svg", "round.png"],
      manifest: {
        name: "Thompson Calendar App",
        short_name: "Thompcal",
        description:
          "A convenient way to remember people's birthdays and to see all the funny quotes on the calendar",
        start_url: "./",
        scope: "./",
        theme_color: "#202124",
        background_color: "#202124",
        display: "standalone",
        icons: [
          {
            src: "./icons/normal.svg",
            type: "image/svg+xml",
            sizes: "512x512",
            purpose: "maskable",
          },
          {
            src: "./icons/192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "./icons/512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
          {
            src: "./icons/round.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
