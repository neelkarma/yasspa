//TODO: Fix fonts not working
import "@fontsource/inter";
import "@fontsource/raleway";
import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
	config: {
		fonts: {
			body: "Inter",
			heading: "Raleway",
		},
		components: {
			Button: {
				variants: {
					primary: {
						bg: "blue.400",
						color: "white",
					},
				},
			},
		},
		initialColorMode: "dark",
		useSystemColorMode: true,
	},
});
