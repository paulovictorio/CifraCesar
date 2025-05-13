import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Decodificar from "./screens/Decodificar";
import HomeScreen from "./screens/HomeScreen";
import Codificar from "./screens/Codificar";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen name="Decodificar" component={Decodificar} />
        <Stack.Screen name="Codificar" component={Codificar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
