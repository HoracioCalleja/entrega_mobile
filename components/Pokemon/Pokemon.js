import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import { Box, HStack, VStack, Pressable } from "native-base";

const Pokemon = ({ navigation, route }) => {
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    logo: {
      width: 132,
      height: 126,
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Box
        bg="primary.600"
        py="4"
        px="3"
        rounded="md"
        alignSelf="center"
        width={375}
        maxWidth="100%"
      >
        <HStack justifyContent="center">
          <Box justifyContent="space-between">
            <VStack space="3">
              <Text fontSize="sm" color="white">
                Tipo : {route.params?.pokemon.types[0].type.name.toUpperCase()}
              </Text>
              <Text color="white" fontSize="lg">
                Nombre : {route.params?.pokemon.name.toUpperCase()}
              </Text>
            </VStack>
            <Image
              source={{
                uri: route.params?.pokemon.sprites.front_default,
              }}
              style={{ width: 100, height: 100 }}
            />
            <Pressable
              rounded="sm"
              bg="primary.300"
              alignSelf="flex-start"
              py="4"
              px="4"
              m="3"
              onPress={() => navigation.goBack()}
            >
              <Text
                textTransform="uppercase"
                fontSize="sm"
                fontWeight="bold"
                color="white"
              >
                VOLVER
              </Text>
            </Pressable>
          </Box>
        </HStack>
      </Box>
    </View>
  );
};

export default Pokemon;
