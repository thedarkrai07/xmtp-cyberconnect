import { Image, Link, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import {
    Blockchain,
    Env,
    FollowButton
} from "@cyberconnect/react-follow-button";
import { useNavStates } from "../../context/ChatContext";
import { useGraph } from "../../context/GraphContext";
import useXmtpStatus from "../../hooks/useXMTPStatus";
import { SocialConnection } from "../../types/AllSocialConnections";
import formatAddress from "../../utils/formatAddress";
import styles from "./index.module.css";
const defaultImgURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const Member = ({
    connection,
    showConnectButton,
}: {
    connection: SocialConnection;
    showConnectButton?: boolean;
}) => {
    const toast = useToast();
    const { setShowModal, setConversationWith } = useNavStates();
    const { loading, results } = useXmtpStatus(connection.address);
    const { refetch } = useGraph();
    return (
        <Stack
            direction={"row"}
            width="100%"
            py={3}
            px={5}
            className={styles.member}
            onClick={() =>
                !showConnectButton && setConversationWith(connection)
            }
        >
            <Image
                src={connection.avatar || defaultImgURL}
                alt={connection.address}
                boxSize={"50px"}
                borderRadius="full"
            />
            <Stack px={2}>
                <Text fontSize="md">
                    {connection.ens ||
                        connection.alias ||
                        formatAddress(connection.address)}
                </Text>
                <Stack direction={"row"}>
                    <Link
                        href={`https://etherscan.io/address/${connection.address}`}
                        target="_blank"
                        fontSize={"sm"}
                        color="gray.500"
                    >
                        Etherscan
                    </Link>
                    <Link
                        href={`https://opensea.io/${connection.address}`}
                        target="_blank"
                        fontSize={"sm"}
                        color="gray.500"
                    >
                        NFTs
                    </Link>
                    {!results && !loading && (
                        <Text fontSize={"sm"} color="gray.500">
                            {" "}
                            Not on XMTP
                        </Text>
                    )}
                </Stack>
            </Stack>
            <Spacer />
            {showConnectButton && !loading && (
                <FollowButton
                    provider={window.ethereum}
                    namespace="CyberConnect"
                    toAddr={connection.address}
                    env={Env.PRODUCTION}
                    chain={Blockchain.ETH}
                    key={connection.address}
                    onSuccess={() => {
                        refetch();
                        setConversationWith({
                            ...connection,
                            address: connection.address,
                        });
                        setShowModal(false);
                    }}
                    onFailure={(e) => {
                        toast({
                            title: "Unable to follow user",
                            description: e.message,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: "bottom-left",
                        });
                    }}
                />
            )}
        </Stack>
    );
};

export default Member;
