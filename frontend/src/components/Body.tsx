import { useMetaMaskAccount } from "../context/MetaMaskAccountProvider";
import { Button } from "@chakra-ui/react";
import useContract from "../utils/useContract";
import { useEffect, useState } from "react";
import { WavesList } from "./WawesList";

export interface Wave {
  address: string;
  timestamp: Date;
  message: string;
}

export const Body = () => {
  const [allWaves, setAllWaves] = useState<Wave[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { ethereum } = useMetaMaskAccount();
  const { contract: wavePortalContract } = useContract();

  const getAllWaves = async () => {
    try {
      if (ethereum) {
        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves: any = await wavePortalContract?.getAllWaves();

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        console.log({ waves });
        const wavesCleaned: Wave[] = [];
        waves?.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        /*
         * Store our data in React State
         */
        setIsLoading(false);
        setAllWaves(wavesCleaned);
        console.log(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      if (ethereum) {
        if (!wavePortalContract) {
          throw new Error("No contract found");
        }

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave("Hello World");

        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWaves();
  }, [ethereum]);

  return (
    <>
      <Button onClick={wave}>Wave!</Button>
      <WavesList waves={allWaves} isLoading={isLoading} />
    </>
  );
};
