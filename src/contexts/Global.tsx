import { createContext } from "react";

type GlobalContextType = {
    name: string;
    setName: (name: string) => void;
};

const GlobalContext = createContext<GlobalContextType>({
    name: "",
    setName: () => {},
});

export default GlobalContext;
