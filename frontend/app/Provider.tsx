import React, { ReactNode } from 'react';
import { ThirdwebProvider } from "thirdweb/react";


const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ThirdwebProvider>
            {children}
        </ThirdwebProvider>
    );
};

export default Provider;