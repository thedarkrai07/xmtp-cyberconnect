import { Divider, ModalHeader, Text } from "@chakra-ui/react";
import React from "react";
import SearchFilter from "../SearchFilter";

const Header = () => {
    return (
        <ModalHeader p={0}>
            <Text pt={6} px={6}>Manage Connections</Text>
            <SearchFilter />
            <Divider />
        </ModalHeader>
    );
};

export default Header;
