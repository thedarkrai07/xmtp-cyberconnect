import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Chatbox } from "./components/Chatbox";
import XmtpProvider from "./components/XMTP/XmtpProvider";
import { GraphContextProvider } from "./context/GraphContext";
import { Web3ContextProvider } from "./context/web3Context";
import client from "./graphql/client";
import WebsitePlaceholder from "./WebsitePlaceholder";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    components: {
        Modal: {
            baseStyle: () => ({
                dialog: {
                    bg: "#000",
                    boxShadow:
                        "rgb(255 255 255 / 20%) 0px 0px 15px, rgb(255 255 255 / 15%) 0px 0px 3px 1px",
                },
            }),
        },
        Divider: {
            baseStyle: () => ({
                borderColor: "#FFF",
            }),
        },
    },
});

function App() {
    return (
        <ApolloProvider client={client}>
            <XmtpProvider>
                <Web3ContextProvider>
                    <GraphContextProvider>
                        <ChakraProvider theme={theme}>
                            <Chatbox />
                            <WebsitePlaceholder/>
                        </ChakraProvider>
                    </GraphContextProvider>
                </Web3ContextProvider>
            </XmtpProvider>
        </ApolloProvider>
    );
}

export default App;
