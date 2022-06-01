// src\context\GraphContext.tsx

import { useQuery } from "@apollo/client";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import { GET_ADDR_CONNECTION_QUERY } from "../graphql/queries/get_connections";
import { GET_IDENTITY } from "../graphql/queries/get_identity";
import {
    AllSocialConnections,
    SocialConnection
} from "../types/AllSocialConnections";
import { Identity } from "../types/identity";
import { useWeb3 } from "./web3Context";

export type GraphNode = {
    id: string;
    img: string;
    group: number;
    neighbors: string[];
    links: GraphLink[];
};

export type GraphLink = {
    source: string;
    target: string;
    value: number;
};

export type GraphData = {
    nodes: GraphNode[];
    links: GraphLink[];
};

export const DEFAULT_QUOTA = 10;

interface GraphContextInterface {
    graphAddress: string; //the address which generate the 3d graph based on it
    graphLoading: boolean; //graph loading status
    identity: Identity | null; //user indentity info including the ens, avatar, twitter etc.
    refetch: () => void; //refetch the graph data
    followerList: SocialConnection[];
    friendList: SocialConnection[];
    followingList: SocialConnection[];
    setShowMutualConnections: Dispatch<SetStateAction<boolean>>;
    showMutualConnections: boolean;
    setShowXMTPConnects: Dispatch<SetStateAction<boolean>>;
    showXMTPConnects: boolean;
}

export const GraphContext = createContext<GraphContextInterface>({
    graphAddress: "",
    graphLoading: true,
    identity: null,
    followerList: [],
    followingList: [],
    friendList: [],
    setShowMutualConnections: async () => undefined, //set show mutual connections function
    refetch: async () => undefined, //refetch the graph data
    showMutualConnections: false, //show mutual connections
    setShowXMTPConnects: async () => undefined, //set show mutual connections function
    showXMTPConnects: false,
});

export const GraphContextProvider: React.FC<{ children: any }> = ({
    children,
}) => {
    const { address } = useWeb3();

    // Cyberlab.eth default address
    const [graphAddress, setGraphAddress] = useState<string>("");

    const [graphLoading, setGraphLoading] = useState<boolean>(false);
    const [identity, setIdentity] = useState<Identity | null>(null);

    const [friendList, setFriendList] = useState<SocialConnection[]>([]);
    const [followingList, setFollowingList] = useState<SocialConnection[]>([]);
    const [followerList, setFollowerList] = useState<SocialConnection[]>([]);

    const identityData = useQuery(GET_IDENTITY, {
        variables: {
            address: graphAddress,
        },
    }).data;

    const [showMutualConnections, setShowMutualConnections] = useState(false);
    const [showXMTPConnects, setShowXMTPConnects] = useState(false);

    useEffect(() => {
        if (identityData) {
            setIdentity(identityData.identity);
        }
    }, [identityData]);

    const { fetchMore } = useQuery(GET_ADDR_CONNECTION_QUERY, {
        variables: {
            address: graphAddress,
            first: 50,
            after: "-1",
            namespace: "",
        },
    });

    // Fetch friends, followings, followers
    const fetch3Fs = useCallback(
        async (targetAddr: string) => {
            setGraphLoading(true);
            const hasNextPage = true,
                after = "-1";
            let followerList: SocialConnection[],
                followingList: SocialConnection[],
                friendList: SocialConnection[];
            followerList = [];
            followingList = [];
            friendList = [];

            // TODO: Paginated fetching
            // Currently only load one batch
            while (hasNextPage) {
                const { data } = await fetchMore({
                    variables: {
                        address: targetAddr,
                        first: 50,
                        after,
                        namespace: "",
                    },
                    updateQuery: (prev: any, { fetchMoreResult }) => {
                        return fetchMoreResult;
                    },
                });

                // Process Followers
                followerList = (data as AllSocialConnections).identity.followers
                    .list;
                followingList = (data as AllSocialConnections).identity
                    .followings.list;
                friendList = (data as AllSocialConnections).identity.friends
                    .list;
                break;
            }

            setFriendList(friendList);
            setFollowerList(followerList);
            setFollowingList(followingList);
            setGraphLoading(false);
        },
        [fetchMore]
    );

    const refetch = () => {
        fetch3Fs(address);
    };

    useEffect(() => {
        if (address) {
            setGraphAddress(address);
            fetch3Fs(address);
        }
    }, [address, fetch3Fs]);

    return (
        <GraphContext.Provider
            value={{
                // values
                graphAddress,
                graphLoading,
                refetch,
                identity,
                friendList,
                followerList,
                followingList,
                showMutualConnections,
                setShowMutualConnections,
                setShowXMTPConnects,
                showXMTPConnects,
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export const useGraph = () => {
    const graph = useContext(GraphContext);
    return graph;
};
