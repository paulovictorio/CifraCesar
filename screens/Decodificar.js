import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Decodificar = () => {
  const navigation = useNavigation();
  const [codigo, setCodigo] = useState("");
  const [hash, setHash] = useState("");
  const [decode, setDecode] = useState("");
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

  const handleDecodificar = async () => {
    if (!codigo || !hash) {
      alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }
    if (!token) {
      alert(
        "Erro de Autenticação",
        "Você precisa estar logado para realizar esta ação."
      );
      navigation.navigate("Home");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/decrypt",
        {
          message: codigo,
          step_hash: hash,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDecode(response.data.decrypted_message);
      setCodigo("");
      setHash("");
      alert("Sucesso", "Mensagem descriptografada com sucesso!");
    } catch (err) {
      console.error("Erro ao decodificar:", err);
      if (err.response && err.response.status === 401) {
        alert(
          "Erro de Autenticação",
          "Sua sessão expirou. Por favor, faça login novamente."
        );
        navigation.navigate("Home");
      } else if (err.response && err.response.status === 403) {
        alert("Hash Inválido", "Este hash já foi utilizado ou não é válido.");
      } else {
        alert("Erro", "Falha ao decodificar.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Decodificar Código</Text>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Hash"
        value={hash}
        onChangeText={setHash}
      />
      <Button
        style={styles.button}
        title="Decodificar"
        onPress={handleDecodificar}
      />
      <TextInput
        style={styles.input}
        placeholder="Decodificação"
        editable={false}
        value={decode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 15,
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

export default Decodificar;
