import type React from "react";
import type { Metadata } from "next";
import { Pacifico, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });
const _roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
	title: "What to Eat - Random Meal Picker",
	description:
		"Discover your next meal! Get a random dish suggestion from 100+ cuisines.",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "/favicon.ico",
				sizes: "any",
			},
			{
				url: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`font-sans antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
