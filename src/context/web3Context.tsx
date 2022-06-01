import CyberConnect from "@cyberlab/cyberconnect";
import { ethers } from "ethers";
import React, { useCallback, useContext, useState } from "react";
import Web3Modal from "web3modal";
import useXmtp from "../hooks/useXmtp";

const cachedLookupAddress = new Map<string, string | undefined>();
const cachedResolveName = new Map<string, string | undefined>();

interface Web3ContextInterface {
    connectWallet: () => Promise<void>;
    provider: ethers.providers.Web3Provider | undefined;
    disconnectWallet: () => void;
    address: string;
    ens: string | null;
    cyberConnect: CyberConnect | null;
    getAddressByEns: (ens: string) => Promise<string | null>;
    resolveName: (name: string) => any;
    lookupAddress: (address: string) => any;
}
// create Context to pass data to different components
export const Web3Context = React.createContext<Web3ContextInterface>({
    connectWallet: async () => undefined, //connect wallet function
    provider: {} as ethers.providers.Web3Provider , //provider
    address: "", // user's signed in address
    ens: "", //user's signed in ens
    cyberConnect: null, //to interact with cyberconnect, e.g. follow/unfollow a address, optional here since we didn't add follow/unfollow button
    disconnectWallet: () => undefined, //disconnect wallet function
    getAddressByEns: async () => null, //get Address from ens function
    resolveName: async () => null, //get ens from address function
    lookupAddress: async () => null, //get address from name function
});

export const Web3ContextProvider: React.FC<{ children: any }> = ({
    children,
}) => {
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
    const [address, setAddress] = useState<string>("");
    const [ens, setEns] = useState<string | null>("");
    const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);

    const { connect } = useXmtp();

    const initCyberConnect = useCallback((provider: any) => {
        const cyberConnect = new CyberConnect({
            provider,
            namespace: "CyberConnect",
        });

        setCyberConnect(cyberConnect);
    }, []);

    // connectWallet fuction to use Web3Modal configuration for enabling wallet access
    const connectWallet = useCallback(async () => {
        // init Web3Modal
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions: {},
        });

        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        await connect(signer);
        // get the address which user used to sign in
        const address = await signer.getAddress();
        // get the ens which user address associated with
        const ens = await getEnsByAddress(provider, address);
        setProvider(provider);
        setAddress(address);
        setEns(ens);
        initCyberConnect(provider.provider);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initCyberConnect]);

    const disconnectWallet = useCallback(async () => {
        setAddress("");
        setEns("");
        setCyberConnect(null);
    }, []);

    const resolveName = useCallback(
        async (name: string) => {
            if (cachedResolveName.has(name)) {
                return cachedResolveName.get(name);
            }
            const address = (await provider?.resolveName(name)) || undefined;
            cachedResolveName.set(name, address);
            return address;
        },
        [provider]
    );

    const lookupAddress = useCallback(
        async (address: string) => {
            if (cachedLookupAddress.has(address)) {
                return cachedLookupAddress.get(address);
            }
            const name = (await provider?.lookupAddress(address)) || undefined;
            cachedLookupAddress.set(address, name);
            return name;
        },
        [provider]
    );

    // the function to get users' address from their ens
    async function getAddressByEns(ens: string) {
        const address = await ethers.providers
            .getDefaultProvider()
            .resolveName(ens);
        return address;
    }

    // the function to get users' ens from their address
    async function getEnsByAddress(
        provider: ethers.providers.Web3Provider,
        address: string
    ) {
        const ens = await provider.lookupAddress(address);
        return ens;
    }

    return (
        <Web3Context.Provider
            value={{
                connectWallet,
                disconnectWallet,
                address,
                ens,
                cyberConnect,
                getAddressByEns,
                resolveName,
                lookupAddress,
                provider
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    const web3 = useContext(Web3Context);
    return web3;
};
