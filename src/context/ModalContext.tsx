import { useQuery } from "@apollo/client";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import { GET_IDENTITY } from "../graphql/queries/get_identity";
import { GET_RECOMMENDATION } from "../graphql/queries/get_recommendation";
import { AllRecommendations } from "../types/AllSocialConnections";

interface ModalState {
    searchResults: any[];
    searchAddress: string;
    setSearchAddress: (x: string) => void;
    isSearchLoading: boolean;
}
export const ModalContext = createContext<ModalState>({
    searchResults: [],
    searchAddress: "",
    setSearchAddress: async () => undefined,
    isSearchLoading: false,
});

export const ModalContextProvider: React.FC<{
    children: any;
    userAddress: string;
}> = ({ children, userAddress }) => {
    const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchAddress, setSearchAddress] = useState<string>("");

    const { fetchMore: fetchMoreRecommendation } = useQuery(
        GET_RECOMMENDATION,
        {
            variables: {
                address: userAddress,
            },
        }
    );

    const { data: identityData, loading: isIdentityLoading } = useQuery(
        GET_IDENTITY,
        {
            variables: {
                address: searchAddress,
            },
        }
    );

    const fetchRecommendations = useCallback(async () => {
        setIsSearchLoading(true);
        const { data: recommendationData } = await fetchMoreRecommendation({
            variables: { address: userAddress },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                return fetchMoreResult;
            },
        });
        const recommendationList = (recommendationData as AllRecommendations)
            .recommendations.data?.list;

        if (!recommendationList) return;

        setSearchResults(recommendationList);
        setIsSearchLoading(false);
    }, [fetchMoreRecommendation, userAddress]);

    useEffect(() => {
        if (!searchAddress) fetchRecommendations();
    }, [searchAddress, fetchRecommendations]);

    useEffect(() => {
        if (identityData) {
            setSearchResults([identityData.identity]);
        }
    }, [identityData]);

    return (
        <ModalContext.Provider
            value={{
                isSearchLoading: isIdentityLoading || isSearchLoading,
                setSearchAddress,
                searchAddress,
                searchResults,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalState = () => {
    return useContext(ModalContext);
};
