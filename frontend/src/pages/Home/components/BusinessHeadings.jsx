import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      data-aos="zoom-in"
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button
          variant={"link"}
          colorScheme={"blue"}
          size={"sm"}
          as="a"
          href={href}
        >
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function BusinessHeading() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Empowering Businesses with Skilled Workers
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Discover top-rated workers for your business. Browse through a wide
          range of services offered by professionals and specialists.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Find a Skilled Worker"}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              "Looking for skilled labor? Connect with verified professionals in various fields such as construction, cleaning, and more."
            }
            href={"/find-worker"}
          />
          <Card
            heading={"Collaborate with Experts"}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              "Collaborate with experts who can help streamline your business operations and offer professional insights."
            }
            href={"/collaborate"}
          />
          <Card
            heading={"Post Your Job"}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              "Post your job requirements and receive bids from qualified workers to fulfill your project needs."
            }
            href={"/post-job"}
          />
          <Card
            heading={"Manage Your Workforce"}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              "Take control of your workforce by managing assignments, tracking progress, and ensuring quality delivery."
            }
            href={"/manage-workforce"}
          />
          <Card
            heading={"About Workerwala"}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              "Learn more about Workerwala and how we help businesses find the right workers efficiently and reliably."
            }
            href={"/about"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
