import React, { useEffect } from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";
import useSWR, { SWRConfig } from "swr";
import Landing from "./landing";
import Loading from "./loading";
import theme from "./theme";

const App: React.FC<{}> = () => {
	const { data } = useSWR("/auth/status");
	useEffect(() => console.log(data), [data]);
	return (
		<SWRConfig
			value={{ fetcher: (...args) => fetch(args).then((res) => res.json()) }}
		>
			<ChakraProvider
				theme={theme}
			>
				{(() => {
					if (!data) return <Loading />;
					if (!data.authenticated) return <Landing />
					return <Text>TODO: Implement this</Text>;
				})()}
			</ChakraProvider>
		</SWRConfig>
	);
};

export default App;
