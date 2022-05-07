import { Box, Center, Stack, Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <Stack>
            <Center marginTop={8} gap={1}>
                <Text fontWeight='normal' color='whiteAlpha.700'>Built with 🖤 by </Text><Text fontWeight='bold'><a href="https://go.santek.dev/builderspace-wave-gh">santek.dev</a></Text>
            </Center>
        </Stack>
    )
}