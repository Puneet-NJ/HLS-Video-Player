import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { Connect, ViteDevServer } from "vite";

export default defineConfig({
	plugins: [
		react(),
		{
			name: "configure-server",
			configureServer(server: ViteDevServer) {
				server.middlewares.use(
					(
						req: Connect.IncomingMessage,
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						res: any,
						next: Connect.NextFunction
					) => {
						// Set correct MIME types for HLS files
						if (req.url?.endsWith(".m3u8")) {
							res.setHeader("Content-Type", "application/x-mpegURL");
						} else if (req.url?.endsWith(".ts")) {
							res.setHeader("Content-Type", "video/MP2T");
						}
						next();
					}
				);
			},
		},
	],
	server: {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
});
