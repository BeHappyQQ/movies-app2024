import React from 'react';
import { Flex, Spin } from 'antd';

const Loader = () => (
  <Flex align="center" gap="middle" className='loader'>
    <Spin size="large" />
  </Flex>
);
export default Loader;