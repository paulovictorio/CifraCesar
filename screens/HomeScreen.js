import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Nome"
      />
      <TextInput 
        style={styles.input}
        placeholder="Senha"
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("Codificar")}
      >
        <Text style={styles.createButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f9",
  },
  createButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  createButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  }
});

export default HomeScreen;
