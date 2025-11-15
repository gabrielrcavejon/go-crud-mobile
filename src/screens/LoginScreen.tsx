import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
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
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        autoCapitalize="none"
        style={styles.input}
      />

      <Button title="Entrar" onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
});
