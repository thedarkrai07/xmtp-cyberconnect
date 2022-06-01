import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useModalState } from "../../context/ModalContext";
import validateAddress from "../../utils/validateAddress";

const SearchFilter = () => {
    const [address, setAddress] = useState("");
    const [error, setError] = useState('');
    const { setSearchAddress, isSearchLoading } = useModalState();

    // TODO: fix type here
    const searchENS = async (e: any) => {
        setError('');

        const isENS = address.slice(-3) === 'eth';
        
        if (!isENS && !validateAddress(address)) {
            setError('Invalid address');
            return;
        }
        setSearchAddress(address);
    }
    return (
        <>
            <InputGroup size="md" px="1.5rem" pb="0.5rem">
                <Input
                    pr="4.5rem"
                    placeholder="Search by ENS / address"
                    variant={"unstyled"}
                    height={10}
                    onChange={e => setAddress(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button
                        isDisabled={!address}
                        isLoading={isSearchLoading}
                        h="1.75rem"
                        size="sm"
                        variant={"outline"}
                        colorScheme="white"
                        onClick={searchENS}
                    >
                        <FaSearch />
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Text color="tomato" size={'md'} px="1.5rem">{error}</Text>
        </>
    );
};

export default SearchFilter;
