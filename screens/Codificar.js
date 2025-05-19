import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Codificar = () => {
  const navigation = useNavigation();
  const [mensagem, setMensagem] = useState("");
  const [passo, setPasso] = useState("");
  const [codigo, setCodigo] = useState("");
  const [hash, setHash] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          setToken(userToken);
        } else {
          alert("Sessão expirada", "Por favor, faça login novamente.");
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error("Erro ao recuperar o token:", error);
      }
    };

    getToken();
  }, []);

  const handleCodificar = async () => {
    try {
      if (!mensagem || !passo) {
        alert("Erro", "Todos os campos são obrigatórios.");
      } else if (!token) {
        alert(
          "Erro de Autenticação",
          "Você precisa estar logado para realizar esta ação."
        );
        navigation.navigate("Home");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:5000/encrypt",
          {
            message: mensagem,
            step: Number(passo),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCodigo(response.data.encrypted_message);
        setHash(response.data.step_hash);
        setMensagem("");
        setPasso("");
        alert("Sucesso", "Mensagem criptografada com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao codificar dados:", err);
      if (err.response && err.response.status === 401) {
        alert(
          "Erro de Autenticação",
          "Sua sessão expirou. Por favor, faça login novamente."
        );
        navigation.navigate("Home");
      } else {
        alert("Erro", "Falha ao codificar dados.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Codificar</Text>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={mensagem}
        onChangeText={setMensagem}
      />
      <TextInput
        style={styles.input}
        placeholder="Passo"
        keyboardType="numeric"
        value={passo}
        onChangeText={setPasso}
      />

      <Button
        title="Codificar"
        style={styles.button}
        onPress={handleCodificar}
      />

      <TextInput
        style={styles.input}
        editable={false}
        placeholder="Código Codificado"
        value={codigo}
      />

      <TextInput
        style={styles.input}
        editable={false}
        placeholder="Código Hash"
        value={hash}
      />

      <Button
        title="Decodificar"
        style={styles.button}
        onPress={() => navigation.navigate("Decodificar")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
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
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6200ee",
    color: "#fff",
    borderRadius: 10,
  },
});

export default Codificar;
