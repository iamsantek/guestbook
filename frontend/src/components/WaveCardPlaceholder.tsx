import { Skeleton } from "@chakra-ui/react";
import { WaveCard } from "./WaveCard";

export const WaveCardPlaceholder = () => {
  return (
    <Skeleton>
      <WaveCard
        wave={{
          address: "0x0000000000000000000000000000000000000000",
          timestamp: new Date(),
          message: "Loading...",
        }}
      />
    </Skeleton>
  );
};
