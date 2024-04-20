import { Pressable, StyleSheet, Text } from "react-native";
import { Href, Link } from "expo-router";

type LinkBtnProps = {
    href: string;
    text: string;
};

export default function LinkBtn(props: LinkBtnProps) {
    return (
        <Link href={props.href as Href<string>} asChild>
            <Pressable style={btnStyles.container}>
                <Text>{props.text}</Text>
            </Pressable>
        </Link>
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
