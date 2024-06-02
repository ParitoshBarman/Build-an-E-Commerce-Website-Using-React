import React, { useContext } from 'react';
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex p="4" bg="teal.500" color="white">
      {authState.isAuthenticated ? (
        <>
          <Box>{authState.email}</Box>
          <Spacer />
          <Link as={RouterLink} to="/" mr="4">
            Home
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Link as={RouterLink} to="/login">
          Login
        </Link>
      )}
    </Flex>
  );
};

export default Navbar;
