import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, VStack, Spinner, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [authState.token, id]);

  const handleAddToCart = () => {
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p="4">
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        product && (
          <Box p="4" borderWidth="1px" borderRadius="lg">
            <VStack spacing="4">
              <Box fontWeight="bold" fontSize="2xl">{product.title}</Box>
              <Box>{product.description}</Box>
              <Box>${product.price}</Box>
              <Button colorScheme="teal" onClick={handleAddToCart}>Add to Cart</Button>
            </VStack>
          </Box>
        )
      )}
    </Box>
  );
};

export default ProductDetailsPage;
