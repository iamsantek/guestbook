import "./App.css";
import { Box, Center, Stack } from "@chakra-ui/react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Box bgGradient="linear(to-l, #7928CA, #FF0080)">
      <Header />
      <Center>
        <Stack p={10}>
          <Body />
          <Footer />
        </Stack>
      </Center>
    </Box>
  );
}

export default App;
