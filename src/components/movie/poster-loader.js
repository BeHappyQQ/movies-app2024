import React from 'react';
import { Flex, Spin } from 'antd';


const PosterLoader = () => (
    <div className='poster-loader'>
        <Flex align="center" gap="middle">
            <Spin />
        </Flex>
    </div>
);

export default PosterLoader;