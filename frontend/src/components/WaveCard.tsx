import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Wave } from "./Body";
import { AvatarGenerator } from "random-avatar-generator";

interface Props {
  wave: Wave;
}

const generator = new AvatarGenerator();

export const WaveCard = ({ wave }: Props) => {
  return (
    <Box minW="2xl" p={4} rounded={4} border="1px" borderColor="whiteAlpha.800">
      <Flex>
        <Box p="4">
          <Avatar
            src={generator.generateRandomAvatar()}
            onClick={() =>
              (window.location.href = `https://rinkeby.etherscan.io/address//${wave.address}`)
            }
            _hover={{
              transform: "scale(1.1)",
              cursor: "pointer",
            }}
          />
        </Box>
        <Spacer />
        <Box p="4">
          <Text color="whiteAlpha.900" fontWeight="bold">
            {wave.message}
          </Text>
        </Box>
        <Spacer />
        <Box p="4">Box 2</Box>
      </Flex>
    </Box>
  );
};
