import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";

interface PokemonDetails {
    types: { slot: number; type: { name: string } }[];
    order: number;
    name: string;
    height: number;
    weight: number;
    stats: { stat: { name: string }; base_stat: number }[];
    abilities: { slot: number; ability: { name: string } }[];
}
export default function Details() {
    const selectedPokemon = useSelector(
        (state: RootState) => state.pokemons.selectedPokemon
    );
    const pokemonImage = useSelector(
        (state: RootState) => state.pokemons.pokemonImage
    );

    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
        null
    );

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = async () => {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
            );
            const result = await response.json();
            setPokemonDetails(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    if (pokemonDetails !== null)
        return (
            <div className="home-view-container details">
                <div className="left-side">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                        alt=""
                    />
                    <img src={pokemonImage || ""} alt="" />
                </div>
                <div className="right-side">
                    <Link to="/">Go Back</Link>
                    <div className="info">
                        <div className="type">
                            <p>Type</p>
                            <div className="types">
                                {pokemonDetails.types.map((type) => (
                                    <span key={type.slot}>
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="specifications">
                            <span>Number: {pokemonDetails.order}</span>
                            <span>Name: {pokemonDetails.name}</span>
                            <span>Height: {pokemonDetails.height}</span>
                            <span>Weight: {pokemonDetails.weight}</span>
                        </div>
                        <div className="pokemon-info">
                            <div className="stats">
                                <p className="title">Stats</p>
                                <div className="stats-bars">
                                    {pokemonDetails.stats.map((stat, index) => (
                                        <div className="item" key={index}>
                                            <p>{stat.stat.name}</p>
                                            <div className="bar">
                                                <span>{stat.base_stat}</span>
                                                <div className="bar-display">
                                                    <div
                                                        className="bar-value"
                                                        style={{
                                                            width: `${stat.base_stat}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="abilities">
                                <p className="title">Abilities</p>
                                {pokemonDetails.abilities.map((ability) => (
                                    <p key={ability.slot}>
                                        {ability.ability.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
