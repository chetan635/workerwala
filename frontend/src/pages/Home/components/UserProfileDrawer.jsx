import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Box,
  Flex,
  Avatar,
  Button,
  Heading,
  Text,
  IconButton,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Textarea,
  Stack,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, EmailIcon, PhoneIcon, InfoIcon } from "@chakra-ui/icons";
import { Auth } from "../../../lib/AuthProvider.jsx";
import { useState, useEffect } from "react";
import WorkerWalaLogo from "../../../components/common/WorkerWalaLogoV2";
import {
  makeApiCallWithHeadersWithoutBody,
  makeApiCallWithHeadersWithBody,
} from "../../../utils/ApiCallService.js";

export default function UserProfileDrawer({ isOpen, onOpen, onClose, btnRef }) {
  const auth = Auth();
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    // Fetch current user profile details
    const fetchUserProfileDetails = async () => {
      try {
        const res = await getCurrentUserProfileDetails();
        setUser(res.data);
        setUserProfile(res.data.profile);
      } catch (err) {
        setUserProfile(null);
      }
    };
    fetchUserProfileDetails();
  }, []);

  const getCurrentUserProfileDetails = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await makeApiCallWithHeadersWithoutBody(
        "GET",
        `user/userDetails?username=${auth.user.username}`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user details");
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  const handleEditToggle = () => setEditing(!editing);

  const handleInputChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!userProfile?.phoneNumber || !/^\d{10}$/.test(userProfile?.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!userProfile?.address) {
      newErrors.address = "Address is required.";
    }

    if (!userProfile?.city) {
      newErrors.city = "City is required.";
    }

    if (!userProfile?.state) {
      newErrors.state = "State is required.";
    }

    if (!userProfile?.country) {
      newErrors.country = "Country is required.";
    }

    if (!userProfile?.bio) {
      newErrors.bio = "Bio cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleProfileUpdate = async () => {
    if (!handleValidation()) return;

    try {
      await makeApiCallWithHeadersWithBody(
        "POST",
        `user/addProfile?userId=${user.id}`,
        userProfile,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        }
      );
      setEditing(false);
      toast({
        title: `Congralutions ${user.username}, you have successfully updated your profile`,
        status: "success",
        isClosable: true
      });
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
      <Drawer size="xl" isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <WorkerWalaLogo />
          </DrawerHeader>

          <DrawerBody>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={useColorModeValue("white", "gray.700")} p={8} boxShadow="lg">
              <Flex alignItems="center" mb={6}>
                <Avatar size="2xl" src={user?.image} name={user?.username} />
                <Box ml={6}>
                  <Heading fontSize="2xl">{user?.username}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    ID: {user?.id}
                  </Text>
                </Box>
                <IconButton
                  icon={<EditIcon />}
                  onClick={handleEditToggle}
                  aria-label="Edit profile"
                  ml="auto"
                  size="sm"
                  variant="outline"
                />
              </Flex>

              <VStack align="start" spacing={5}>
                <Stack spacing={4} w="full">
                  <HStack>
                    <EmailIcon />
                    <Text>{user?.email}</Text>
                  </HStack>

                  <HStack>
                    <PhoneIcon />
                    {editing ? (
                      <FormControl isInvalid={!!errors.phoneNumber}>
                        <Input
                          name="phoneNumber"
                          value={userProfile?.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Phone"
                        />
                        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                      </FormControl>
                    ) : (
                      <Text>{userProfile?.phoneNumber || "+91 XXXXXXXXXX"}</Text>
                    )}
                  </HStack>

                  <HStack>
                    <InfoIcon />
                    {editing ? (
                      <FormControl isInvalid={!!errors.occupation}>
                        <Input
                          name="occupation"
                          value={userProfile?.occupation}
                          onChange={handleInputChange}
                          placeholder="Occupation"
                        />
                        <FormErrorMessage>{errors.occupation}</FormErrorMessage>
                      </FormControl>
                    ) : (
                      <Text>{userProfile?.occupation || "Occupation not specified"}</Text>
                    )}
                  </HStack>

                  <Divider />

                  <Box w="full">
                    <Text fontWeight="bold" mb={2}>
                      Address:
                    </Text>
                    {editing ? (
                      <>
                        <FormControl isInvalid={!!errors.address}>
                          <Input
                            name="address"
                            value={userProfile?.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                          />
                          <FormErrorMessage>{errors.address}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.city}>
                          <Input
                            name="city"
                            value={userProfile?.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            mt={2}
                          />
                          <FormErrorMessage>{errors.city}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.state}>
                          <Input
                            name="state"
                            value={userProfile?.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            mt={2}
                          />
                          <FormErrorMessage>{errors.state}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.country}>
                          <Input
                            name="country"
                            value={userProfile?.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            mt={2}
                          />
                          <FormErrorMessage>{errors.country}</FormErrorMessage>
                        </FormControl>
                      </>
                    ) : (
                      <Text>{`${userProfile?.address}, ${userProfile?.city}, ${userProfile?.state}, ${userProfile?.country}`}</Text>
                    )}
                  </Box>

                  <Divider />

                  <Box w="full">
                    <Text fontWeight="bold" mb={2}>
                      Bio:
                    </Text>
                    {editing ? (
                      <FormControl isInvalid={!!errors.bio}>
                        <Textarea
                          name="bio"
                          value={userProfile?.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us something about you"
                        />
                        <FormErrorMessage>{errors.bio}</FormErrorMessage>
                      </FormControl>
                    ) : (
                      <Text>{userProfile?.bio || "No bio available"}</Text>
                    )}
                  </Box>
                </Stack>
              </VStack>
            </Box>
          </DrawerBody>

          <DrawerFooter gap="10px">
            {editing ? (
              <Button colorScheme="blue" onClick={handleProfileUpdate}>
                Save Changes
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleEditToggle}>
                Edit Profile
              </Button>
            )}
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
