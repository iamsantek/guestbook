import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Wave } from "./Body";
import { AvatarGenerator } from "random-avatar-generator";
import { format } from 'timeago.js';
import { memo } from "react";

interface Props {
  wave: Wave;
}

const generator = new AvatarGenerator();

const WaveCard = ({ wave }: Props) => {
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
        <Box p="4">
          <Text  color='whiteAlpha.800' fontWeight='light'>
            {format(wave.timestamp, 'en_US')}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(WaveCard);