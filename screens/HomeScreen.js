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
  listContainer: {
    paddingBottom: 20,
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
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
  taskInfo: {
    marginBottom: 10,
  },
  taskName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  taskDescription: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
  taskStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskStatusText: {
    fontSize: 14,
    marginRight: 10,
    fontWeight: "bold",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
  },
  deleteButton: {
    backgroundColor: "#FF4D4D",
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
