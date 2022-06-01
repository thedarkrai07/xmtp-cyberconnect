import { Flex, Stack, Text } from "@chakra-ui/react";
import { Message } from "@xmtp/xmtp-js";
import React, { MutableRefObject } from "react";
import Emoji from "react-emoji-render";
import { formatTime } from "../../../helpers";
import AddressPill from "../AddressPill";
import Avatar from "../Avatar";

export type MessageListProps = {
    messages: Message[];
    walletAddress: string | undefined;
    messagesEndRef: MutableRefObject<null>;
};

type MessageTileProps = {
    message: Message;
    isSender: boolean;
};

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
    return d1?.toDateString() === d2?.toDateString();
};

const formatDate = (d?: Date) =>
    d?.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const MessageTile = ({ message, isSender }: MessageTileProps): JSX.Element => (
    <Stack direction="row" p={3}>
        <Avatar peerAddress={message.senderAddress as string} />
        <Flex ml={3} grow={1} direction="column">
            <Stack direction={"row"} justifyContent="space-between">
                <AddressPill
                    address={message.senderAddress as string}
                    userIsSender={isSender}
                />
                <Text fontSize="sm" color={"grey.500"}>
                    {formatTime(message.sent)}
                </Text>
            </Stack>
            <Text>
                {message.error ? (
                    `Error: ${message.error?.message}`
                ) : (
                    <Emoji text={message.content || ""} />
                )}
            </Text>
        </Flex>
    </Stack>
);

function DateDividerBorder({ children }: { children: any }) {
    return (
        <>
            <div className="grow h-0.5 bg-gray-300/25" />
            {children}
            <div className="grow h-0.5 bg-gray-300/25" />
        </>
    );
}

const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
    <div className="flex align-items-center items-center pb-8 pt-4">
        <DateDividerBorder>
            <span className="mx-11 flex-none text-gray-300 text-sm font-bold">
                {formatDate(date)}
            </span>
        </DateDividerBorder>
    </div>
);

const ConversationBeginningNotice = (): JSX.Element => (
    <div
        className="flex align-items-center justify-center pb-4"
        style={{ textAlign: "center" }}
    >
        <span className="text-gray-300 text-sm font-semibold">
            This is the beginning of the conversation
        </span>
    </div>
);

const MessagesList = ({
    messages,
    walletAddress,
    messagesEndRef,
}: MessageListProps): JSX.Element => {
    let lastMessageDate: Date | undefined;

    return (
        <Stack w={"100%"} p={2}>
            {messages && messages.length ? (
                <ConversationBeginningNotice />
            ) : null}
            {messages?.map((msg: Message) => {
                const isSender = msg.senderAddress === walletAddress;
                const tile = (
                    <MessageTile
                        message={msg}
                        key={msg.id}
                        isSender={isSender}
                    />
                );
                const dateHasChanged = !isOnSameDay(lastMessageDate, msg.sent);
                lastMessageDate = msg.sent;
                return dateHasChanged
                    ? [<DateDivider date={msg.sent} key={msg.id} />, tile]
                    : tile;
            })}
            <div ref={messagesEndRef} />
        </Stack>
    );
};
export default MessagesList;
