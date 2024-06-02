import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const Loading = () => (
  <Center mt="20">
    <Spinner size="xl" />
  </Center>
);

export default Loading;
