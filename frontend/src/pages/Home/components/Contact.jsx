import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import "../../../css/home/components/Contact.css";
import { useState } from "react";
import { makeApiCallWithHeadersWithBody } from "../../../utils/ApiCallService";
import { Auth } from "../../../lib/AuthProvider";

export default function Contact({ contactSectionRef }) {
  // Creating veriables for the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const auth = Auth();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const resetForm = () => {
    setEmail("");
    setName("");
    setMessage("");
  };

  const handleContactUsFormSubmit = async () => {
    const accessToken = auth.accessToken;
    if (accessToken == "" || accessToken == null || accessToken == undefined) {
      toast({
        title: `Plese Login to contact the owner.`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    if (email === "" || email.includes("@") == false) {
      setIsEmailError(true);
      toast({
        title: `Please enter valid email address`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsEmailError(false),
      });
      setIsLoading(false);
      return;
    }

    const sendContactUsEmailResponse = await makeApiCallWithHeadersWithBody(
      "POST",
      "user/sendMailFromUser",
      {
        name: name,
        mailId: email,
        message: message,
      },
      {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      }
    );

    const data = await sendContactUsEmailResponse.json();

    if (data.status == "success") {
      toast({
        title: `Mail sent scccessfully`,
        status: "success",
        isClosable: true,
      });
      setIsLoading(false);
      resetForm();
      return;
    }
    toast({
      title: data.message,
      status: "error",
      isClosable: true,
    });
    setIsLoading(false);
    return;
  };

  return (
    <Container
      ref={contactSectionRef}
      className="contact-container"
      maxW="full"
      mt={0}
      centerContent
    >
      <Flex>
        <Box className="contact-box">
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text className="contact-description">
                    Fill up the form below to contact
                  </Text>
                  <Box className="contact-button-group">
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="300px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        +91-9834366791
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="300px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                      >
                        chetanchinchulkar1135@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="300px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                      >
                        Pune, India
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      color="#ffffff"
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#8c19a1" }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      color="#ffffff"
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#8c19a1" }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      color="#ffffff"
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#8c19a1" }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box className="contact-form-box">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            size="md"
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            isInvalid={isEmailError}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            size="md"
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          onChange={(e) => setMessage(e.target.value)}
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="submit">
                        <Button
                          isLoading={isLoading}
                          onClick={() => handleContactUsFormSubmit()}
                          variant="solid"
                          bg="#8c19a1"
                          _hover={{ bg: "#0D74FF" }}
                          color="white"
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
