import React from "react";
import Pokemon from "./components/Pokemon/Pokemon.js";
import Home from "./components/Home/Home.js";
import Login from "./components/Login/Login.js";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NativeBaseProvider } from "native-base";

const YourApp = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Pokemon" component={Pokemon} />
          {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default YourApp;
