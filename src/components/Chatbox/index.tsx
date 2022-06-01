// src\components\SearchBar\index.tsx

import { useEffect } from "react";
import { ChatContextProvider } from "../../context/ChatContext";
import { useWeb3 } from "../../context/web3Context";
import ConfigurationsModal from "./ConfigurationsModal";
import ContactBoard from "./ContactBoard";
import ContactNavbar from "./ContactNavbar";

export const Chatbox: React.FC = () => {
    const { disconnectWallet } = useWeb3();

    useEffect(() => {
        // window.ethereum.on("accountsChanged", disconnectWallet);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContextProvider>
            <ContactNavbar />
            <ContactBoard />
            <ConfigurationsModal />
        </ChatContextProvider>
    );
};
