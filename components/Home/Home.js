import React, { useState, useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon.js";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

const Home = ({ navigation, props }) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemons, setPokemons] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    // fetch("https://pokeapi.co/api/v2/pokemon/")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json.results);
    //     setPokemons(json.results);
    //   })
    //   .catch((error) => console.error(error));
    console.log(props);
    getPokemons();
  }, []);

  const Item = ({ name }) => (
    <View>
      <Text>Nombre: {name}</Text>
    </View>
  );

  const getPokemon = async (name) => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase()
      );
      const json = await response.json();
      setPokemon(json);
      console.log(pokemon);
      navigation.navigate("Pokemon", { pokemon: json });
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const json = await response.json();
      setPokemons(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          style={styles.inputPokemon}
          onChangeText={(value) => setPokemonName(value)}
          value={pokemonName}
          placeholder={"Escribi el nombre de un pokemon"}
        />
        <Button
          style={styles.botonBuscar}
          onPress={() => {
            getPokemon(pokemonName);
          }}
          title="Buscar pokemon"
        />
        {pokemon != null ? (
          <View style={styles.container}>
            <Text>{"Nombre: " + pokemon.name}</Text>
            <Text>{"Altura: " + pokemon.height}</Text>
            <Text>{"Peso: " + pokemon.weight}</Text>
            <Button
              title="Ver más"
              onPress={() =>
                navigation.navigate("Pokemon", { pokemon: pokemon })
              }
            />
          </View>
        ) : null}

        <Text>{error != null ? "ERROR:" + error : null}</Text>
      </ScrollView>
      {pokemons != null ? (
        <FlatList
          style={{
            marginVertical: 15,
          }}
          data={pokemons}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.item} onPress={() => getPokemon(item.name)}>
              Name: {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  botonBuscar: {},
  inputPokemon: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 20,
    padding: 10,
    textAlign: "center",
  },
  logo: {
    width: 132,
    height: 126,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "#F47979",
    borderColor: "#000000",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 1,
    marginHorizontal: 2,
    borderRadius: 10,
  },
});

export default Home;
