import { Text } from "react-native";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";
type ExampleProps = {
    name: string;
};

export default function Example(props: ExampleProps) {
    const global = useContext(GlobalContext);
    return (
        <Text>
            Hello, {props.name} and {global.name}!
        </Text>
    );
}
