import { useMetaMaskAccount } from "../context/MetaMaskAccountProvider";
import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import useContract from "../utils/useContract";
import { useEffect, useState } from "react";
import { WavesList } from "./WawesList";
import { FiMessageCircle } from "react-icons/fi";
import { toast } from "react-hot-toast"

export interface Wave {
  address: string;
  timestamp: Date;
  message: string;
}

export const Body = () => {
  const [allWaves, setAllWaves] = useState<Wave[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMining, setIsMining] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { ethereum, connectedAccount } = useMetaMaskAccount();
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

        const count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(
          "Hello World",
          { gasLimit: 300000 }
        );

        setIsMining(true);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        setIsMining(false);
        setMessage("");
        toast('🎉 Your wave has been sent!')
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const onNewWave = (from: string, timestamp: number, message: string) => {
      setAllWaves(prevState => [
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
        ...prevState
      ]);
    };

    wavePortalContract?.on("NewWave", onNewWave);


    return () => {
      wavePortalContract?.off("NewWave", onNewWave);
    };
  }, [!!wavePortalContract, connectedAccount]);


  useEffect(() => {
    getAllWaves();
  }, [ethereum]);

  return (
    <>
      {!connectedAccount && <Center><Text mb={5} fontWeight='bold' color='red.100'>Connect your MetaMask wallet to the Rinkeby network and left a message!</Text></Center>}
      {connectedAccount && (
        <Stack marginBottom={6} gap={2}>
          <Input
            size='md'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant='flushed'
            placeholder='Ship your message! 🚀'
            color='whiteAlpha.900'
            _placeholder={{
              color: 'whiteAlpha.600',
            }}
          />
          <Button
            isLoading={isMining}
            loadingText="Mining...please wait"
            leftIcon={<FiMessageCircle />}
            onClick={wave}>
            Send message (Rinkeby net)
          </Button>
        </Stack>
      )}
      <WavesList waves={allWaves} isLoading={isLoading} />
    </>
  );
};
