import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import WorkerWalaLogo from "../../../components/common/WorkerWalaLogoV2";

// Logo component without the SVG path
const Logo = (props) => {
  return (
    <Box fontSize="2xl" fontWeight="bold">
      <WorkerWalaLogo />
    </Box>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <Text as="a" href={"#"}>
            Home
          </Text>
          <Text as="a" href={"#"}>
            About
          </Text>
          <Text as="a" href={"#"}>
            Contact
          </Text>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 Workerwala. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Github"} href={"#"}>
              <Icon icon="fe:github" />
            </SocialButton>
            <SocialButton label={"Gmail"} href={"#"}>
              <Icon icon="simple-icons:gmail" />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <Icon icon="uil:instagram" />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
