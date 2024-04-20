import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable, Text } from "react-native";
import Example from "../components/Example";
import LinkBtn from "../components/LinkBtn";
import { APIUsuarios, Usuario } from "../services/api/usuarios";
import { useState } from "react";

export default function Home() {
    const name = "Sit amet";
    const userAPI = new APIUsuarios(null);
    const [user, setUser] = useState<Usuario | null>(null);
    async function createUser() {
        const newUser = await userAPI.create({
            nome: "João",
            email: "teste@teste.com.br",
            senha: "123456",
        });
        setUser(newUser);
    }
    return (
        <View style={styles.container}>
            <Example name="Lorem Ipsum" />
            <LinkBtn href={`./other/${name}`} text="Go to other page" />
            <Pressable style={btnStyles.container} onPress={createUser}>
                <Text>Criar Usuario</Text>
            </Pressable>
            <Text>{user ? user.nome : "Sem usuario"}</Text>
            <StatusBar style="auto" />
        </View>
    );
}
const btnStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
