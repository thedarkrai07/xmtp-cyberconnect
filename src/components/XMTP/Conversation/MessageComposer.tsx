import React, { useCallback, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { classNames } from "../../../helpers";
import messageComposerStyles from "../../../styles/MessageComposer.module.scss";

type MessageComposerProps = {
    onSend: (msg: string) => Promise<void>;
    error: Error | null;
};

const MessageComposer = ({
    onSend,
    error,
}: MessageComposerProps): JSX.Element => {
    const [message, setMessage] = useState("");

    const onMessageChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) =>
            setMessage(e.currentTarget.value),
        []
    );

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!message) {
                return;
            }
            setMessage("");
            await onSend(message);
        },
        [onSend, message]
    );
    return (
        <div
            style={{ width: "100%" }}
            className={classNames(messageComposerStyles.container)}
        >
            <form
                autoComplete="off"
                onSubmit={onSubmit}
                style={{ display: "flex" }}
            >
                <input
                    type="text"
                    placeholder={error ? "Error :(" : "Type something..."}
                    className={classNames(
                        "block",
                        "w-full",
                        "text-md",
                        "md:text-sm",
                        messageComposerStyles.input
                    )}
                    name="message"
                    value={error ? "" : message}
                    onChange={onMessageChange}
                    required
                    style={{ flexGrow: 1 }}
                    disabled={error !== null}
                />
                <button
                    type="submit"
                    className={messageComposerStyles.arrow}
                    disabled={error !== null}
                >
                    <IoMdSend color={message ? "green" : "grey"} />
                </button>
            </form>
        </div>
    );
};

export default MessageComposer;
