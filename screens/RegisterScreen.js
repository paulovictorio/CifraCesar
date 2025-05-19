import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Erro", "As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        alert(
          "Sucesso",
          "Registro realizado com sucesso! Faça login para continuar.",
          [{ text: "OK", onPress: () => navigation.navigate("Home") }]
        );
      } else {
        alert(
          "Erro no Registro",
          response.data.message || "Não foi possível fazer o registro"
        );
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert(
        "Erro de Conexão",
        "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Conta</Text>

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

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.loginLink}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  registerButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  registerButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLink: {
    textAlign: "center",
    color: "#6200ee",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default RegisterScreen;
