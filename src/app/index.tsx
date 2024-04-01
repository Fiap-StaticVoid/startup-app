import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Example from "../components/Example";
import LinkBtn from "../components/LinkBtn";

export default function Home() {
    const name = "Sit amet";
    return (
        <View style={styles.container}>
            <Example name="Lorem Ipsum" />
            <LinkBtn href={`./other/${name}`} text="Go to other page" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
