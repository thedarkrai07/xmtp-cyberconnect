// src\graphql\queries\get_connections.tsx

import { gql } from "@apollo/client";

export const GET_ADDR_CONNECTION_QUERY = gql`
    query identity(
        $address: String!
        $first: Int
        $after: String
    ) {
        identity(address: $address, network: ETH) {
            avatar
            followings(
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                    avatar
                    ens
                }
            }
            followers(
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                    avatar
                    ens
                }
            }
            friends(
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                    avatar
                    ens
                }
            }
        }
    }
`;
