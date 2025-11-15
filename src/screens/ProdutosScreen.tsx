import { Button, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function ProdutosScreen() {
  const { user, logout } = useAuth();

  return (
    <View>
      <Text>Bem-vindo aos produtos {user?.nome}</Text>
    </View>
  );
}
