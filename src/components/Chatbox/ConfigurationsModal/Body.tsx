import { ModalBody } from "@chakra-ui/react";
import React from "react";
import { useModalState } from "../../../context/ModalContext";
import Member from "../../Member";

const Body = () => {
    const { searchResults } = useModalState();
    return (
        <ModalBody p="0">
            {searchResults.map((m) => (
                <Member
                    key={m.address}
                    connection={m}
                    showConnectButton={true}
                />
            ))}
        </ModalBody>
    );
};

export default Body;
