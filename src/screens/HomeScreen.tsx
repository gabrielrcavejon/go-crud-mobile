import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackLista } from "../routes/AppRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type HomeScreenProps = NativeStackScreenProps<AppStackLista, "Home">;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { user, logout } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.saudacao}>{getGreeting()},</Text>
      <Text style={styles.nomeUsuario}>{user?.nome}</Text>

      <View style={styles.cardContainer}>
        {/* CARD DE PRODUTOS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Produtos")}
        >
          <Ionicons name="pricetags-outline" size={32} color="#007AFF" />

          <View style={styles.cardTextoGrupo}>
            <Text style={styles.tituloCard}>Gerenciar Produtos</Text>
            <Text style={styles.subtituloCard}>Controle suas mercadorias</Text>
          </View>

          <Ionicons name="arrow-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        {/* Você pode adicionar mais cards aqui (ex: Pedidos, Clientes) */}
      </View>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.textLogout}>Sair da conta</Text>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    backgroundColor: "#f4f4f8",
    paddingHorizontal: 30,
  },
  saudacao: {
    fontSize: 18,
    color: "#666",
  },
  nomeUsuario: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a2a2aff",
  },
  cardContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    gap: 15, // Espaço entre os elementos do card
  },
  cardTextoGrupo: {
    flex: 1, // Usa o espaço que resta e nao empurra nada pro lado
  },
  tituloCard: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#2a2a2aff",
  },
  subtituloCard: {
    fontSize: 14,
    color: "#888",
  },
  logout: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e64910ff",
    elevation: 5,
    gap: 15,
    borderRadius: 8,
    color: "#fff",
  },
  textLogout: {
    color: "#fff",
    fontSize: 16,
  },
});
