import { Divider, Spacer, Stack, Switch, Text } from "@chakra-ui/react";
import { useGraph } from "../../../context/GraphContext";

const Footer = () => {
    const {
        showMutualConnections,
        setShowMutualConnections,
        showXMTPConnects,
        setShowXMTPConnects,
    } = useGraph();
    const updateState = (e: any) => {
        setShowMutualConnections(e.target.checked);
    };
    return (
        <>
            <Divider />
            <Stack px={6} py={3} direction="row" align={"right"}>
                <Stack direction={"row"}>
                    <Switch
                        isChecked={showXMTPConnects}
                        onChange={(e) => setShowXMTPConnects(e.target.checked)}
                    />
                    <Text>Disable CyberConnect</Text>
                </Stack>
                <Spacer />
                {!showXMTPConnects && <Stack direction={"row"}>
                    <Text>Show Friends Only</Text>{" "}
                    <Switch
                        isChecked={showMutualConnections}
                        onChange={updateState}
                    />
                </Stack>}
            </Stack>
        </>
    );
};

export default Footer;
