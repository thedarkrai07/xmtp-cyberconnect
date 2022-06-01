import { Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingScreen = () => {
    return (
        <>
          <p>Fetching your friends and connections</p>
          <br/>
          <Spinner size="lg"/>  
        </>
    );
}

export default LoadingScreen;