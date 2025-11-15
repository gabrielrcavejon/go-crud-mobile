import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ProdutosScreen from "../screens/ProdutosScreen";

export type AuthStackLista = {
  Login: undefined;
};

export type AppStackLista = {
  Home: undefined;
  Produtos: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackLista>();
const AppStack = createNativeStackNavigator<AppStackLista>();

// ROTA LOGIN
const AuthRoutes = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// ROTAS PRIVADAS (REQUEREM AUTENTICACAO)
const ApplicationRoutes = () => (
  <AppStack.Navigator screenOptions={{ headerShown: true }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="Produtos" component={ProdutosScreen} />
  </AppStack.Navigator>
);

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return user ? <ApplicationRoutes /> : <AuthRoutes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
