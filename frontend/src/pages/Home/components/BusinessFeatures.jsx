import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Define features relevant to Workerwala
const features = [
  {
    id: 1,
    title: "Skilled Workers on Demand",
    text: "Quickly find workers with specialized skills for any job, whether it’s construction, cleaning, or tech services.",
  },
  {
    id: 2,
    title: "Verified and Trusted",
    text: "All workers are verified for authenticity, so you can trust the professionals you hire for your projects.",
  },
  {
    id: 3,
    title: "Affordable Rates",
    text: "Find workers who offer competitive rates without compromising on quality or expertise.",
  },
  {
    id: 4,
    title: "Easy Job Posting",
    text: "Post your job requirements in just a few clicks, and get bids from skilled workers within minutes.",
  },
  {
    id: 5,
    title: "Efficient Job Management",
    text: "Manage tasks, track progress, and communicate directly with your workers through our platform.",
  },
  {
    id: 6,
    title: "Flexible Scheduling",
    text: "Choose workers based on your preferred timeline and manage schedules easily through the platform.",
  },
  {
    id: 7,
    title: "Ratings & Reviews",
    text: "Check out worker ratings and reviews from other users to help you make the best choice for your needs.",
  },
  {
    id: 8,
    title: "Secure Payments",
    text: "Make payments securely through our platform and ensure both workers and employers are protected.",
  },
];

export default function BusinessFeatures() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Features that Empower Your Workforce</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Workerwala offers a seamless way to connect businesses with reliable,
          skilled workers. Here’s what sets us apart:
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack data-aos="zoom-in" key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
