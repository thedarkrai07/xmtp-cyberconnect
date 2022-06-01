import Blockies from "react-blockies";

type AvatarProps = {
    peerAddress: string;
};

const Avatar = ({ peerAddress }: AvatarProps) => (
    <div style={{ borderRadius: "50%", width: '40px', height: '40px' }}>
        <Blockies seed={peerAddress} size={10} className="rounded-full" />
    </div>
);

export default Avatar;
