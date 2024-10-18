import React, { useState } from 'react';
import {
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
  Input,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import { EditIcon, EmailIcon, PhoneIcon, LinkIcon, InfoIcon } from '@chakra-ui/icons';

const UserProfile = ({ userData }) => {
  const [editing, setEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(userData);

  const handleEditToggle = () => setEditing(!editing);
  const handleInputChange = (e) => setUserProfile({ ...userProfile, [e.target.name]: e.target.value });

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.700')}
      p={8}
      boxShadow="lg"
    >
      <Flex alignItems="center" mb={6}>
        <Avatar size="2xl" src={userProfile?.image} name={userProfile?.name} />
        <Box ml={6}>
          <Heading fontSize="2xl">{userProfile?.name}</Heading>
          <Text fontSize="sm" color="gray.500">
            ID: {userProfile?.id}
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
            {editing ? (
              <Input
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            ) : (
              <Text>{userProfile?.email}</Text>
            )}
          </HStack>

          <HStack>
            <PhoneIcon />
            {editing ? (
              <Input
                name="phone"
                value={userProfile.phone}
                onChange={handleInputChange}
                placeholder="Phone"
              />
            ) : (
              <Text>{userProfile?.phone}</Text>
            )}
          </HStack>

          <HStack>
            <LinkIcon />
            {editing ? (
              <Input
                name="website"
                value={userProfile.website}
                onChange={handleInputChange}
                placeholder="Website"
              />
            ) : (
              <Text>{userProfile?.website || 'N/A'}</Text>
            )}
          </HStack>

          <HStack>
            <InfoIcon />
            {editing ? (
              <Input
                name="occupation"
                value={userProfile.occupation}
                onChange={handleInputChange}
                placeholder="Occupation"
              />
            ) : (
              <Text>{userProfile?.occupation || 'Occupation not specified'}</Text>
            )}
          </HStack>

          <Divider />

          <Box w="full">
            <Text fontWeight="bold" mb={2}>
              Address:
            </Text>
            {editing ? (
              <>
                <Input
                  name="address"
                  value={userProfile.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
                <Input
                  name="city"
                  value={userProfile.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  mt={2}
                />
                <Input
                  name="state"
                  value={userProfile.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  mt={2}
                />
                <Input
                  name="country"
                  value={userProfile.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  mt={2}
                />
              </>
            ) : (
              <Text>
                {`${userProfile?.address}, ${userProfile?.city}, ${userProfile?.state}, ${userProfile?.country}`}
              </Text>
            )}
          </Box>

          <Divider />

          <Box w="full">
            <Text fontWeight="bold" mb={2}>
              Bio:
            </Text>
            {editing ? (
              <Textarea
                name="bio"
                value={userProfile.bio}
                onChange={handleInputChange}
                placeholder="Tell us something about you"
              />
            ) : (
              <Text>{userProfile?.bio || 'No bio available'}</Text>
            )}
          </Box>
        </Stack>

        <Divider />

        {editing ? (
          <Button colorScheme="blue" onClick={() => setEditing(false)}>
            Save Changes
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleEditToggle}>
            Edit Profile
          </Button>
        )}
      </VStack>
    </Box>
  );
};

// Example Usage
const App = () => {
  const sampleUser = {
    id: '123456',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA',
    occupation: 'Software Engineer',
    website: 'https://johndoe.dev',
    bio: 'A passionate software engineer with over 10 years of experience.',
    image: 'https://bit.ly/dan-abramov',
  };

  return (
    <Flex align="center" justify="center" h="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <UserProfile userData={sampleUser} />
    </Flex>
  );
};

export default App;