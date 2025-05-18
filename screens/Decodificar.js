import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const Decodificar = () => {
  const [codigo, setCodigo] = useState("");
  const [hash, setHash] = useState("");
  const [decode, setDecode] = useState("");

  const handleDecodificar = async () => {
    if (!codigo || !hash) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }
    try {
      const response = await axios.post(
        `http://10.68.153.202:3000/decodificar`,
        {
          codigo,
          hash,
        }
      );
      console.log(response.data);
      setDecode(codigo + " " + hash);//teste
      setCodigo("");
      setHash("");
      Alert.alert("Sucesso", "Mensagem decriptografada com sucesso!")
    } catch (err) {
      console.error("Erro decodificar:", err);
      Alert.alert("Erro", "Falha ao decodificar.");
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
    marginTop: 20
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6200ee",
    color: "#fff",
    borderRadius: 10,
  },
});

export default Decodificar;
