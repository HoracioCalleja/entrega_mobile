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
  const [pokemons, setPokemons] = useState(null);

  useEffect(async () => {
    console.log(props);
    getPokemons();
  }, []);

  const next = async (pokemons) => {
    try {
      console.log(pokemons);
      const response = await fetch(pokemons.next);
      const json = await response.json();
      setPokemons(json);
    } catch (error) {
      console.error(error);
    }
  };

  const previous = async (pokemons) => {
    try {
      console.log(pokemons);
      const response = await fetch(pokemons.previous);
      const json = await response.json();
      setPokemons(json);
    } catch (error) {
      console.error(error);
    }
  };

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
      setPokemons(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      {pokemons != null ? (
        <FlatList
          style={{
            marginVertical: 15,
          }}
          data={pokemons.results}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.item} onPress={() => getPokemon(item.name)}>
              Name: {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          )}
          ListHeaderComponent={() => (
            <View
              style={{
                felx: 1,
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
                padding: 20,
                margin: 10,
              }}
            >
              <Button
                style={styles.botonBuscar}
                onPress={() => {
                  previous(pokemons);
                }}
                title="Previous"
                disabled={pokemons.previous == null}
              />
              <Button
                style={styles.botonBuscar}
                onPress={() => {
                  next(pokemons);
                }}
                title="Next"
                disabled={pokemons.next == null}
              />
            </View>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  botonBuscar: {
    width: "100px",
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
