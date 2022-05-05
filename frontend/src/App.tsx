import "./App.css";
import { Box, Center, Stack } from "@chakra-ui/react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";

function App() {
  return (
    <Box w="100%" h="100vh" bgGradient="linear(to-l, #7928CA, #FF0080)">
      <Header />
      <Center>
        <Stack p={10}>
          <Body />
        </Stack>
      </Center>
    </Box>
  );
}

export default App;
