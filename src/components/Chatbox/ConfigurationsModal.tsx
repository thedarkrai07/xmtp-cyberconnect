import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay
} from "@chakra-ui/react";
import { useNavStates } from "../../context/ChatContext";
import { useGraph } from "../../context/GraphContext";
import { ModalContextProvider } from "../../context/ModalContext";
import Body from "./ConfigurationsModal/Body";
import Footer from "./ConfigurationsModal/Footer";
import Header from "./ConfigurationsModal/Header";

const ConfigurationsModal = () => {
    const { showModal, setShowModal } = useNavStates();
    const { graphAddress } = useGraph();

    return (
        <>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    isOpen={showModal}
                    isCentered
                    closeOnOverlayClick={false}
                    size="2xl"
                    scrollBehavior="inside"
                >
                    <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
                    <ModalContextProvider userAddress={graphAddress}>
                        <ModalContent>
                            <Header />
                            <ModalCloseButton />
                            <Body />
                            <Footer />
                        </ModalContent>
                    </ModalContextProvider>
                </Modal>
            )}
        </>
    );
};

export default ConfigurationsModal;
