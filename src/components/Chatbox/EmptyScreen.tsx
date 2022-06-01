import { Text } from "@chakra-ui/react";
import { GiSadCrab } from "react-icons/gi";

const EmptyScreen = () => {
    return (
        <>
            <Text align={"center"}>
                Oops! No friends found.
                <br/>
                Click the plus button to add new friends
            </Text>
            <br />
            <GiSadCrab size={'4rem'}/>
        </>
    );
};

export default EmptyScreen;
