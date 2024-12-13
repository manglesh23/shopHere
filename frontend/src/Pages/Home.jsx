import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Input,
  Button,
  Grid,
  GridItem,
  IconButton,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

const Home = () => {
  const logout = () => {
    console.log("Log Out");
    localStorage.removeItem("authToken");
    // alert("Logged out successfully!");
    window.location.href = "/";
  };
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      flexDirection="column"
      width="190vh"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        bg="white"
        p={4}
        boxShadow="sm"
        position="sticky"
        w="100%"
        // overflow="hidden"
        zIndex="dropdown"
      >
        <Text fontSize="2xl" fontWeight="bold" color="teal.500">
          Riyandu's Dukan
        </Text>
        <Flex gap={4} width="70%">
          <Input
            placeholder="Search for products"
            width="100%"
            bg="white"
            borderRadius="md"
          />
          <IconButton
            aria-label="Search"
            icon={<FiSearch />}
            colorScheme="teal"
            //  w="full"
          />

          <HStack spacing={4}>
            <Menu isLazy placement="top">
              <Tooltip label="User Profile" aria-label="User Profile Tooltip">
                <MenuButton
                  as={IconButton}
                  aria-label="User Profile"
                  icon={<FiUser />}
                  variant="ghost"
                  fontSize="xl"
                />
              </Tooltip>
              <MenuList
                zIndex="dropdown" // Ensure it's above other elements
                borderRadius="md" // Optional: Adjust styling of the dropdown
                boxShadow="md"
                // position="absolute" // Explicitly set position
                // transform="translateY(-8px)"
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>

            <IconButton
              aria-label="Shopping Cart"
              icon={<FiShoppingCart />}
              variant="ghost"
              fontSize="xl"
            />
          </HStack>
        </Flex>
      </Flex>

      {/* Hero Section */}
      <Box
        width="100%"
        h="300px"
        bgImage="url('https://via.placeholder.com/1200x300')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="full"
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          textAlign="center"
          width="100%"
          size="lg"
        >
          <Text fontSize="3xl" fontWeight="bold">
            Welcome to E-Shop
          </Text>
          <Text fontSize="lg" mt={2}>
            Your one-stop destination for all your shopping needs.
          </Text>
          <Button mt={4} colorScheme="teal" size="lg">
            Shop Now
          </Button>
        </Flex>
      </Box>

      {/* Category Section */}
      <Box p={4} w="100%">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          {/* Categories */}
        </Text>
        <Flex gap={4} overflowX="auto" width="100%" justifyContent="center">
          {["Electronics", "Fashion", "Home", "Books", "Sports"].map(
            (category) => (
              <Button key={category} colorScheme="teal" size="sm">
                {category}
              </Button>
            )
          )}
        </Flex>
      </Box>

      {/* Featured Products */}
      <Box p={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Featured Products
        </Text>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {[...Array(8)].map((_, index) => (
            <GridItem
              key={index}
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
            >
              <VStack>
                <Image
                  src="https://via.placeholder.com/150"
                  alt="Product Image"
                  borderRadius="md"
                />
                <Text fontSize="lg" fontWeight="bold">
                  Product {index + 1}
                </Text>
                <Text color="teal.500" fontSize="lg">
                  999
                </Text>
                <Button colorScheme="teal" size="sm" mt={2}>
                  Add to Cart
                </Button>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" p={6} mt={8}>
        <Flex justify="space-between" flexWrap="wrap">
          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="bold">E-Shop</Text>
            <Text>About Us</Text>
            <Text>Contact Us</Text>
          </VStack>
          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="bold">Support</Text>
            <Text>FAQs</Text>
            <Text>Return Policy</Text>
          </VStack>
          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="bold">Follow Us</Text>
            <Text>Facebook</Text>
            <Text>Instagram</Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
