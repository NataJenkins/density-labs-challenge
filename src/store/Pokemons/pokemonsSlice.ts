import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
    name: string;
}

interface PokemonsState {
    pokemons: Pokemon[];
    selectedPokemon: string | null;
    pokemonImage: string | null;
}

const initialState: PokemonsState = {
    pokemons: [],
    selectedPokemon: "ditto",
    pokemonImage: null,
};

const pokemonSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {
        setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
            state.pokemons = action.payload;
        },
        setSelectedPokemon: (state, action: PayloadAction<string | null>) => {
            state.selectedPokemon = action.payload;
        },
        setPokemonImage: (state, action: PayloadAction<string | null>) => {
            state.pokemonImage = action.payload;
        },
    },
});

export const { setPokemons, setSelectedPokemon, setPokemonImage } =
    pokemonSlice.actions;
export default pokemonSlice.reducer;
