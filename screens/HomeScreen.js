import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("userToken", response.data.token);

        navigation.navigate("Codificar");
      } else {
        alert(
          "Erro de Login",
          response.data.message || "Credenciais inválidas"
        );
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(
        "Erro de Conexão",
        "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f9",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
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
  },
  registerLink: {
    textAlign: "center",
    color: "#6200ee",
    fontSize: 16,
  },
});

export default HomeScreen;
