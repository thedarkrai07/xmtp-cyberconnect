
import { Conversation } from "@xmtp/xmtp-js/dist/types/src";
import { SocialConnection } from "../types/AllSocialConnections";

const conversationsToConnection = (conversation: Conversation[]):SocialConnection[] => {
    return conversation.map((c) => {
        return {
            address: c.peerAddress
        } as SocialConnection;
    });
}

export default conversationsToConnection;