"use client";

import WormholeConnect, {
    WormholeConnectConfig, WormholeConnectPartialTheme
  } from '@wormhole-foundation/wormhole-connect';
  
  const config: WormholeConnectConfig = {
    // networks: ['sepolia', 'solana', 'avalanche', 'arbitrium', 'fantom', 'polygon', 'xdai', 'bsc', 'celo','base-sepolia'],
    env: 'testnet',
    bridgeDefaults: {
      toNetwork: 'sepolia'
    }
  };
  
  const theme: WormholeConnectPartialTheme = {
    background: {
      default: 'black',
    }
  };
  
  const  Bridge = () => {
    return (
      <WormholeConnect config={config} theme={theme} />
    )
  }

  export default Bridge;