import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { GetProdutos, Produto } from "../service/produtoService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProdutos() {
    try {
      setLoading(true);

      const response = await GetProdutos();

      if (!response.sucesso) {
        setError("Faha na requisição dos produtos. " + response.mensagem);
      }

      setProdutos(response.data);
    } catch (err) {
      console.error(err);
      setError("Erro de conexão com o servidor. Tente novamente." + err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.produto}>
      <Text style={styles.produtoNome}>
        {item.idproduto} - {item.nome}
      </Text>
      <Text style={styles.produtoDescricao}>{item.descricao}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>

        <Button title="Tentar novamente" onPress={fetchProdutos} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <Text style={styles.titulo}>Lista de produtos ({produtos.length})</Text>

      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.idproduto.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPrincipal: {
    flex: 1,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 15,
    color: "red",
  },
  titulo: {
    fontWeight: "bold",
    color: "#2a2a2aff",
    fontSize: 22,
    marginBottom: 20,
  },
  produto: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 2,
    marginBottom: 10,
    padding: 10,
    flexDirection: "column",
    borderRadius: 8,
    elevation: 5,
    margin: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF", // Linha azul de destaque
  },
  produtoDescricao: {
    fontSize: 13,
    color: "#333",
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
