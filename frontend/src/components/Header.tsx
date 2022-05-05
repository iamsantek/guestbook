import { Flex, Box, Heading, Spacer, ButtonGroup } from "@chakra-ui/react";
import { MetaMaskConnectButton } from "./MetaMaskConnectButton";

export const Header = () => {
  return (
    <Flex p={8} minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading color="whiteAlpha.900">Wave Portal</Heading>
      </Box>
      <Spacer />
      <ButtonGroup>
        <MetaMaskConnectButton />
      </ButtonGroup>
    </Flex>
  );
};
