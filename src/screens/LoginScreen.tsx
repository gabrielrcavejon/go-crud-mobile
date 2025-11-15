import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // Para desabilitar o botão durante a requisição

  async function handleLogin() {
    if (!email || email.length === 0 || !senha || senha.length === 0) {
      Alert.alert("Erro", "Por favor, preencha email e senha.");
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, senha);

      if (!response) {
        Alert.alert("Erro", "Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Houve um problema ao tentar logar. Verifique sua conexão.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>
        Acesse sua conta no Go Crud Mobile para ver seus produtos!
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
        editable={!loading}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} // Aplica estilo de disabled se estiver carregando
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    backgroundColor: "#f4f4f8", // Fundo levemente cinza
    padding: 30,
  },
  input: {
    width: "100%", // Pega todo o container, mas nao fica super esticado por conta do padding 30 ali do container
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 15,
    borderColor: "#c9c3c3ff", // Borda sutil
    marginBottom: 15, // Espaço entre os inputs
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0b7bf2ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a0c4ff", // Azul mais claro quando desabilitado
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
