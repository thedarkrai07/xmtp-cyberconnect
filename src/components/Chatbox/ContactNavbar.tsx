import { Spacer, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import {
    HiOutlineChevronDoubleDown,
    HiOutlineChevronDoubleUp
} from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavStates } from "../../context/ChatContext";
import { useGraph } from "../../context/GraphContext";
import { SocialConnection } from "../../types/AllSocialConnections";
import formatAddress from "../../utils/formatAddress";
import styles from "./index.module.css";

interface ContactNavbarInterface {}

const ContactNavbar: React.FC<ContactNavbarInterface> = () => {
    const {
        isOpen,
        setIsOpen,
        setShowModal,
        conversationWith,
        setConversationWith,
    } = useNavStates();

    const { graphAddress } = useGraph();

    const NavChevron = isOpen
        ? HiOutlineChevronDoubleDown
        : HiOutlineChevronDoubleUp;

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
        },
        [setIsOpen, isOpen]
    );

    const openModal = useCallback(
        (e: React.MouseEvent<SVGElement, MouseEvent>) => {
            e.stopPropagation();
            setShowModal(true);
        },
        [setShowModal]
    );

    const goBack = useCallback(
        (e: React.MouseEvent<SVGElement, MouseEvent>) => {
            e.stopPropagation();
            setConversationWith({} as SocialConnection);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div className={styles.flexbox} onClick={handleClick}>
            {conversationWith.address && <IoMdArrowRoundBack onClick={goBack} />}
            <Text pl={conversationWith.address ? 3 : 0}>
                {conversationWith.address
                    ? conversationWith.ens || formatAddress(conversationWith.address)
                    : "Messages"}
            </Text>
            <Spacer />
            <div className={styles.actions}>
                {graphAddress && <BiMessageSquareAdd onClick={openModal} />}
                <NavChevron />
            </div>
        </div>
    );
};

export default ContactNavbar;
