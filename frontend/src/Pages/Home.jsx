import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

// import handlebuynow from "../helper/handleBuyNow";

const fetchProduct = async ({ pageParam = 1 }) => {
  // console.log("Page Param:-", pageParam);
  let response = await axios.get(
    `http://localhost:7000/product/getproduct?page=${pageParam}&limit=2`
  );
  return response.data;
  // console.log("Response:-", response.data);
};

const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
    getNextPageParam: (lastPage) => {
      // console.log("last Page:-", lastPage);
      if (!lastPage) return undefined;
      const { currentPage, totalPages } = lastPage;
      // console.log("Current and last:-", currentPage, totalPages);
      let nextPage = currentPage <= totalPages ? currentPage + 1 : undefined;
      // console.log("Next page:-", nextPage);
      // console.log("Has next Page:-",hasNextPage,isFetchingNextPage);
      return nextPage;
    },
  });

  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          let user = jwtDecode(token);
          console.log("User:-", user);
          setRole(user.role);
        } else {
          console.warn("not token");
        }
      } catch (err) {
        console.log("Error:-", err);
      }
    };
    fetchUserRole();
  }, []);

  const logout = () => {
    console.log("Log Out");
    localStorage.removeItem("authToken");
    // alert("Logged out successfully!");
    window.location.href = "/";
  };

  const addproduct = () => {
    navigate("/addproduct");
  };

  const handleBuyNow = (product) => {
    console.log("Buy Now");

    navigate("/payment", {
      state: {
        price: product.price, // Example price
        productName: product.name,
        description: "Product Description",
      },
    });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt="10">
        <Text fontSize="lg" color="red.500">
          Failed to load products. Please try again later.
        </Text>
      </Box>
    );
  }

  const handleClick = () => {
    console.log("Add to cart");
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
        <Text fontSize="2xl" fontWeight="bold" color="teal.500" fontStyle="oblique">
          Shop Here
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
                {role === "Admin" && (
                  <MenuItem onClick={addproduct}>Add Product</MenuItem>
                )}
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
          {data?.pages.map((page, pageIndex) =>
            page.products.map((product) => (
              <GridItem
                key={`${pageIndex}-${product._id}`}
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Image
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  borderRadius="md"
                  mb={3}
                />
                <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                  {product.name}
                </Text>
                <Text color="teal.500" fontSize="md" mt={1}>
                  ₹{product.price}
                </Text>
                <HStack spacing={4} mt={3} width="100%">
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={handleClick}
                    width="50%"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={()=>handleBuyNow(product)}
                    width="50%"
                  >
                    Buy Now
                  </Button>
                </HStack>
              </GridItem>
            ))
          )}
        </Grid>
        {hasNextPage && (
          <Box textAlign="center" mt={8}>
            <Button
              onClick={() => fetchNextPage()}
              isDisabled={!hasNextPage || isFetchingNextPage}
              isLoading={isFetchingNextPage}
              colorScheme="teal"
            >
              {isFetchingNextPage
                ? "Loading..."
                : hasNextPage
                ? "Load More"
                : "No More Products"}
            </Button>
          </Box>
        )}
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
