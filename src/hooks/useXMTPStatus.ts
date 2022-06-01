import { getAddress } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import useXmtp from './useXmtp';

const useXmtpStatus = (address: string) => {
    const { checkIfOnNetwork } = useXmtp();

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(false);

    const checkIfOnNetworkAsync = async () => {
        setLoading(true);
        const result = await checkIfOnNetwork(getAddress(address));
        setLoading(false);
        setResults(result);
    }

    useEffect(() => {
        checkIfOnNetworkAsync();
    }, [])

    return { loading, results }


}

export default useXmtpStatus
