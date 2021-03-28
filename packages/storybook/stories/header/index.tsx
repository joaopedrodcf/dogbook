import React from 'react';
import { Header as TypescriptMonorepoHeader } from '@typescript-monorepo/header';

export interface HeaderProps {
    title: string;
    links: ILinks[];
}

interface ILinks {
    name: string;
    href: string;
}

export const Header: React.FC<HeaderProps> = ({ title, links }) => {
    return <TypescriptMonorepoHeader title={title} links={links} />;
};
