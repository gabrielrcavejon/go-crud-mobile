import { Button, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View>
      <Text>Bem-vindo {user?.nome}</Text>

      <Button title="Sair" onPress={logout} />
    </View>
  );
}
