const formatAddress = (address: string) => {
    const len = address.length;
    return address.substr(0, 6) + "..." + address.substring(len - 4, len);
};

export default formatAddress;