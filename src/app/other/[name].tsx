import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Example from "../../components/Example";
import { useLocalSearchParams } from "expo-router";

type OtherNameRouterParams = {
    name: string;
};

export default function OtherName() {
    const router = useLocalSearchParams<OtherNameRouterParams>();
    return (
        <View style={styles.container}>
            <Example name={router.name ?? "None"} />
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
