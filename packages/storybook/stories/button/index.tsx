import React from 'react';
import { Button as TypescriptMonorepoButton } from '@typescript-monorepo/button';

export interface ButtonProps {
    label: string;
}

export const Button: React.FC<ButtonProps> = ({ label }) => {
    return <TypescriptMonorepoButton>{label}</TypescriptMonorepoButton>;
};
