import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Select, VStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOrder = searchParams.get('sort') || '';
  const categoryFilter = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?filter=men&page=1&limit=5&sort=price&order=asc');
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSearchParams({ sort, category: categoryFilter });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSearchParams({ sort: sortOrder, category });
  };

  const sortedAndFilteredProducts = products
    .filter((product) => (categoryFilter ? product.category.toLowerCase() === categoryFilter.toLowerCase() : true))
    .sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a.price - b.price;
      }
      if (sortOrder === 'descending') {
        return b.price - a.price;
      }
      return 0;
    });

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
        <>
          <VStack mb="4" spacing="4">
            <Select placeholder="Sort by Price" onChange={handleSortChange} value={sortOrder}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </Select>
            <Select placeholder="Filter by Category" onChange={handleCategoryChange} value={categoryFilter}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="home decor">Home Decor</option>
            </Select>
          </VStack>
          <Grid templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="4">
            {sortedAndFilteredProducts.map((product) => (
              <Box key={product.id} p="4" borderWidth="1px" borderRadius="lg">
                <VStack spacing="4">
                  <Box fontWeight="bold">{product.title}</Box>
                  <Box>{product.category}</Box>
                  <Box>${product.price}</Box>
                  <RouterLink to={`/product/${product.id}`}>More Details</RouterLink>
                </VStack>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default HomePage;
