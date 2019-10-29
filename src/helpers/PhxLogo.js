import React from "react";
import { defaultLightTheme, defaultDarkTheme } from "./themes";
let vars = {};

try {
	let theme = JSON.parse(localStorage.getItem("darkTheme"));

	if (theme) {
		vars = {
			...defaultDarkTheme,
			...JSON.parse(localStorage.getItem("userDarkTheme"))
		};
	} else {
		vars = {
			...defaultLightTheme,
			...JSON.parse(localStorage.getItem("userLightTheme"))
		};
	}
} finally {
}

export const PhxLogo = props => (
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid meet"
		viewBox="0 0 50 50"
		width="50"
		height="50"
	>
		<defs>
			<path
				d="M31.61 15.7C30.77 15.4 29.9 15.14 29 15.01C28.08 14.88 27.12 14.84 26.16 14.93C25.17 15.02 24.16 15.24 23.16 15.6C22.37 15.89 21.6 16.26 20.87 16.69C20.1 17.14 19.37 17.66 18.69 18.25C17.98 18.88 17.33 19.58 16.74 20.36C16.12 21.17 15.59 22.07 15.15 23.04C14.68 24.05 14.34 25.12 14.13 26.21C13.91 27.35 13.83 28.51 13.9 29.68C13.98 30.88 14.21 32.08 14.61 33.24C15.02 34.43 15.59 35.58 16.34 36.64C18.25 39.41 20.84 41.42 23.76 42.6C26.57 43.74 29.52 44.04 32.32 43.6C34.89 43.19 37.24 42.16 39.21 40.64C40.97 39.28 42.39 37.54 43.39 35.54C43.45 35.41 43.49 35.27 43.51 35.13C43.52 34.98 43.52 34.83 43.49 34.68C43.47 34.52 43.43 34.37 43.37 34.23C43.3 34.09 43.22 33.96 43.13 33.85C43.03 33.74 42.93 33.66 42.82 33.6C42.72 33.54 42.61 33.52 42.51 33.52C42.4 33.52 42.3 33.54 42.21 33.6C42.12 33.66 42.04 33.75 41.97 33.86C41.04 35.49 39.77 36.86 38.23 37.9C36.55 39.03 34.58 39.75 32.46 39.97C30.18 40.21 27.82 39.86 25.57 38.88C23.25 37.88 21.18 36.25 19.6 34.06C19 33.25 18.53 32.37 18.18 31.46C17.83 30.56 17.61 29.64 17.5 28.7C17.4 27.79 17.41 26.88 17.52 25.98C17.64 25.1 17.86 24.25 18.18 23.42C18.37 22.9 18.61 22.39 18.88 21.92C19.14 21.45 19.43 21.01 19.74 20.59C20.05 20.19 20.39 19.81 20.74 19.46C21.09 19.11 21.46 18.79 21.84 18.5C22.04 18.34 22.24 18.2 22.44 18.07C22.65 17.93 22.86 17.8 23.07 17.68C23.28 17.56 23.49 17.45 23.71 17.34C23.92 17.23 24.14 17.13 24.36 17.04C24.6 16.94 24.85 16.85 25.1 16.77C25.35 16.69 25.6 16.62 25.84 16.56C26.09 16.51 26.34 16.46 26.59 16.43C26.83 16.39 27.08 16.37 27.32 16.35C27.11 16.42 26.9 16.5 26.7 16.59C26.49 16.67 26.29 16.77 26.09 16.88C25.88 16.99 25.68 17.1 25.5 17.23C25.3 17.36 25.11 17.5 24.93 17.65C24.81 17.75 24.68 17.86 24.57 17.97C24.45 18.08 24.33 18.2 24.22 18.32C24.1 18.44 23.99 18.57 23.89 18.7C23.78 18.84 23.68 18.98 23.58 19.12C22.79 20.28 22.31 21.59 22.15 22.98C21.97 24.46 22.15 25.99 22.67 27.47C23.22 29 24.13 30.43 25.35 31.62C26.57 32.82 28.08 33.73 29.77 34.25C30.75 34.55 31.73 34.73 32.68 34.79C33.62 34.84 34.53 34.78 35.39 34.62C36.24 34.46 37.04 34.2 37.79 33.86C38.5 33.52 39.17 33.11 39.77 32.62C40.35 32.14 40.86 31.62 41.29 31.06C41.71 30.51 42.05 29.93 42.33 29.32C42.6 28.74 42.8 28.12 42.94 27.49C43.08 26.88 43.16 26.26 43.19 25.62C43.24 24.08 43.02 22.61 42.59 21.24C42.19 19.94 41.6 18.71 40.86 17.57C40.14 16.47 39.27 15.45 38.27 14.53C37.28 13.61 36.14 12.78 34.84 12.08C34.76 12.04 34.67 12 34.6 11.98C34.51 11.96 34.43 11.96 34.36 11.96C34.29 11.97 34.23 11.98 34.17 12.02C34.12 12.05 34.08 12.09 34.05 12.15C34.03 12.21 34.02 12.27 34.03 12.34C34.04 12.4 34.07 12.47 34.11 12.54C34.15 12.61 34.21 12.68 34.28 12.74C34.34 12.81 34.42 12.86 34.51 12.91C35.68 13.53 36.71 14.28 37.6 15.1C38.5 15.93 39.28 16.86 39.92 17.86C40.57 18.88 41.08 19.99 41.41 21.15C41.76 22.37 41.91 23.67 41.81 25C41.77 25.54 41.69 26.06 41.55 26.56C41.41 27.08 41.21 27.58 40.96 28.05C40.71 28.54 40.4 29 40.03 29.43C39.65 29.87 39.22 30.27 38.72 30.62C38.2 30.99 37.65 31.3 37.05 31.53C36.44 31.78 35.78 31.95 35.1 32.04C34.4 32.14 33.67 32.15 32.93 32.08C32.16 32.01 31.39 31.84 30.62 31.58C30.32 31.48 30.02 31.36 29.73 31.23C29.44 31.1 29.16 30.94 28.89 30.78C28.62 30.61 28.35 30.44 28.11 30.24C27.85 30.05 27.61 29.85 27.39 29.63C27.87 29.86 28.35 30.04 28.86 30.18C29.35 30.32 29.85 30.42 30.36 30.47C30.85 30.52 31.35 30.52 31.83 30.49C32.31 30.45 32.79 30.38 33.25 30.26C33.94 30.09 34.58 29.85 35.17 29.55C35.74 29.26 36.26 28.91 36.72 28.52C37.17 28.15 37.57 27.73 37.91 27.27C38.24 26.83 38.52 26.36 38.75 25.86C38.97 25.37 39.13 24.87 39.24 24.37C39.35 23.88 39.4 23.38 39.41 22.88C39.41 22.4 39.38 21.91 39.29 21.42C39.21 20.95 39.08 20.47 38.92 19.99C38.51 18.84 37.92 17.77 37.19 16.82C36.49 15.89 35.64 15.05 34.69 14.33C33.74 13.6 32.66 12.97 31.5 12.47C30.31 11.96 28.99 11.59 27.58 11.39C25.74 11.13 23.88 11.15 22.05 11.41C20.05 11.71 18.06 12.32 16.19 13.24C14.1 14.27 12.14 15.69 10.5 17.5C8.65 19.53 7.22 22.04 6.51 24.93C6.46 25.13 6.48 25.31 6.55 25.47C6.62 25.64 6.74 25.78 6.9 25.9C7.07 26.01 7.28 26.09 7.52 26.14C7.76 26.19 8.04 26.2 8.33 26.17C8.62 26.14 8.9 26.07 9.17 25.97C9.42 25.87 9.66 25.74 9.87 25.6C10.07 25.45 10.25 25.29 10.37 25.11C10.5 24.94 10.59 24.76 10.62 24.57C11.03 22.19 12.05 20.09 13.44 18.34C14.7 16.76 16.26 15.49 17.97 14.54C19.52 13.68 21.2 13.09 22.92 12.77C24.51 12.48 26.15 12.42 27.78 12.61C29 12.75 30.14 13.06 31.18 13.49C32.2 13.91 33.14 14.45 33.98 15.08C34.81 15.72 35.55 16.45 36.16 17.27C36.78 18.1 37.28 19.03 37.61 20.04C37.74 20.43 37.83 20.83 37.88 21.22C37.94 21.62 37.96 22.02 37.94 22.41C37.92 22.82 37.85 23.22 37.75 23.61C37.64 24.01 37.49 24.4 37.3 24.78C37.09 25.17 36.85 25.53 36.57 25.87C36.28 26.21 35.94 26.52 35.57 26.8C35.19 27.09 34.77 27.33 34.31 27.53C33.84 27.74 33.33 27.9 32.79 28.01C32.36 28.1 31.92 28.14 31.48 28.13C31.03 28.13 30.58 28.08 30.13 27.98C29.68 27.88 29.23 27.73 28.8 27.54C28.37 27.35 27.95 27.11 27.55 26.82C27.16 26.54 26.78 26.22 26.45 25.87C26.12 25.52 25.83 25.15 25.59 24.75C25.35 24.35 25.16 23.94 25.03 23.52C24.9 23.1 24.88 22.45 24.89 22.02C24.9 21.78 25.01 21.26 25.09 21.07C25.16 20.88 25.25 20.69 25.34 20.51C25.43 20.33 25.53 20.15 25.63 19.99C26.04 19.3 26.59 18.75 27.21 18.33C27.82 17.93 28.49 17.66 29.2 17.51C29.88 17.36 30.59 17.33 31.3 17.43C31.95 17.52 32.55 17.71 33.11 18C33.2 18.04 33.29 18.08 33.39 18.1C33.48 18.12 33.57 18.12 33.65 18.11C33.74 18.1 33.82 18.07 33.88 18.03C33.95 17.99 34 17.94 34.04 17.87C34.08 17.8 34.1 17.73 34.11 17.65C34.11 17.57 34.1 17.49 34.07 17.4C34.04 17.32 34 17.24 33.95 17.17C33.89 17.09 33.82 17.02 33.74 16.96C33.09 16.46 32.41 15.99 31.61 15.7Z"
				id="a1ky6fowf"
			></path>
		</defs>
		<g>
			<g>
				<g>
					<use
						href="#a1ky6fowf"
						opacity="1"
						fill={vars["@text-color"]}
						fillOpacity="0.86"
					></use>
					<g>
						<use
							href="#a1ky6fowf"
							opacity="1"
							fillOpacity="0"
							stroke="#000000"
							strokeWidth="1"
							strokeOpacity="0"
						></use>
					</g>
				</g>
			</g>
		</g>
	</svg>
);
