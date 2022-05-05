import { Wave } from "./Body";
import { WaveCard } from "./WaveCard";
import { WaveCardPlaceholder } from "./WaveCardPlaceholder";

interface Props {
  waves: Wave[];
  isLoading: boolean;
}

export const WavesList = ({ waves, isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <>
          <WaveCardPlaceholder />
          <WaveCardPlaceholder />
        </>
      ) : (
        waves.map((wave: Wave) => (
          <WaveCard key={wave.timestamp.toISOString()} wave={wave} />
        ))
      )}
    </>
  );
};
