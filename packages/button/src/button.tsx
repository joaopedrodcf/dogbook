import React from 'react';
import { Wrapper } from './styles';

export const Button: React.FC = ({ children }) => {
    const a = 'a';
    return <Wrapper>{children + a} </Wrapper>;
};
