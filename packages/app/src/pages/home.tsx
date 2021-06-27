import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_POKEMON_DETAILS = gql`
    {
        pokemons(limit: 150, offset: 0) {
            results {
                url
                name
                image
            }
        }
    }
`;

export const Home: React.FC = () => {
    const { loading, error, data } = useQuery(GET_POKEMON_DETAILS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(
        '🚀 ~ file: home.tsx ~ line 23 ~ returndata.pokemons.results.map ~ data.pokemons.results',
        data.pokemons.results
    );

    return (
        <ul>
            {data.pokemons.results.map((x: any) => (
                <div key={x.name}>
                    <p>{x.name}</p>
                    <img src={x.image} alt={x.name} />
                </div>
            ))}
        </ul>
    );
};

export default Home;
