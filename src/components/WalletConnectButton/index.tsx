//src\components\WalletConnectButton\index.tsx

import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useWeb3 } from "../../context/web3Context";
import styles from "./index.module.css";

export const WalletConnectButton: React.FC = () => {
    //get user logged in wallet address/ens, get connect wallet function
    const { connectWallet, address, ens } = useWeb3();

    const [loading, setLoading] = useState<boolean>(false);

    const connect = useCallback(async () => {
        setLoading(true);
        await connectWallet();
        setLoading(false);
    }, [connectWallet]);

    //if user didn't successfully logged in, we shows the wallet connect button
    //if user logged in, we show the logged in user's ens or edted address
    return (
        <>
            
            {!address ? (
                <>
                    <p>To establish connection, please connect your wallet</p>
                    <br/>    
                    <Button
                        colorScheme='white'
                        variant='solid'
                        isLoading={loading}
                        disabled={loading}
                        onClick={connect}
                        className={styles.connectWalletButton}
                        sx={{
                            "& .MuiLoadingButton-loadingIndicator": {
                                color: "#000",
                            },
                        }}
                    >
                        Connect Wallet
                    </Button>
                </>
            ) : (
                <div className={styles.walletInfo}>
                    {address}
                    <br></br>
                    {ens || null}
                </div>
            )}
        </>
    );
};

WalletConnectButton.displayName = "WalletConnectButton";
