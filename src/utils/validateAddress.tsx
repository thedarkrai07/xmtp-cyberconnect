const validateAddress = (address: string) => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    return address.match(re);
};

export default validateAddress;