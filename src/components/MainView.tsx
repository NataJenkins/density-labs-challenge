import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import React from "react";

import {
    setPokemons,
    setSelectedPokemon,
    setPokemonImage,
} from "../store/Pokemons/pokemonsSlice";
import Pokeball from "../assets/pokeball.png";
import "./styles.scss";

export default function Main() {
    const pokemons = useSelector((state: RootState) => state.pokemons.pokemons);
    const pokemonImage = useSelector(
        (state: RootState) => state.pokemons.pokemonImage
    );

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [fetchedpokemons, setFetchedPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 20;

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")
            .then((response) => response.json())
            .then((data) => setFetchedPokemons(data.results));
    }, []);

    useEffect(() => {
        getRandomPokemonImage().then((results) =>
            dispatch(setPokemonImage(results.sprites.front_default))
        );
    }, [dispatch]);

    useEffect(() => {
        if (fetchedpokemons.length > 0) {
            dispatch(setPokemons(fetchedpokemons));
        }
    }, [fetchedpokemons, dispatch]);

    const getRandomPokemonImage = async () => {
        const random = Math.floor(Math.random() * 151);
        let imageurl = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${random}`
        );
        let url = await imageurl.json();

        return url;
    };

    const getSelectedPokemonImage = async (name) => {
        let imageurl = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let url = await imageurl.json();

        dispatch(setPokemonImage(url.sprites.front_default));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleDoubleClick = (name) => {
        dispatch(setSelectedPokemon(name));
        navigateTo("/details");
    };
    const startIndex = (currentPage - 1) * pokemonsPerPage;
    const endIndex = startIndex + pokemonsPerPage;

    const currentPokemons = pokemons.slice(startIndex, endIndex);

    return (
        <div className="home-view-container">
            <div className="left-side">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                    alt=""
                />
                <img src={pokemonImage || ""} alt="" />
            </div>
            <div className="rigth-side">
                <ul>
                    {currentPokemons.map((pokemon) => (
                        <li
                            key={pokemon.name}
                            onClick={() =>
                                getSelectedPokemonImage(pokemon.name)
                            }
                            onDoubleClick={() =>
                                handleDoubleClick(pokemon.name)
                            }
                        >
                            <div>{pokemon.name}</div>
                            <img src={Pokeball} alt="" className="pokeball" />
                        </li>
                    ))}
                </ul>
                <div className="buttons">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={endIndex >= pokemons.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
