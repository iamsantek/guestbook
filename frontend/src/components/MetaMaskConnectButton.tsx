import { Avatar, AvatarBadge, Button, Flex, Text } from "@chakra-ui/react";
import { useMetaMaskAccount } from "../context/MetaMaskAccountProvider";
import { FaEthereum } from "react-icons/fa";

export const MetaMaskConnectButton = () => {
  const { connectedAccount, connectAccount } = useMetaMaskAccount();

  return !connectedAccount ? (
    <Button leftIcon={<FaEthereum />} onClick={connectAccount}>
      Connect to MetaMask
    </Button>
  ) : (
    <Flex direction="column" gap={3} alignItems="center">
      <Avatar bg="whatsapp.400" icon={<FaEthereum fontSize="1.5rem" />}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text fontWeight="bold" color="whiteAlpha.800">
        {connectedAccount?.slice(-4).toUpperCase()}
      </Text>
    </Flex>
  );
};
