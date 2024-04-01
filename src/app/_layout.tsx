import GlobalContext from "../contexts/Global";
import { Slot } from "expo-router";
export default function App() {
    return (
        <GlobalContext.Provider
            value={{ name: "Lorem Ipsum", setName: () => {} }}
        >
            <Slot />
        </GlobalContext.Provider>
    );
}
