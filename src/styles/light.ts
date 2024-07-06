import {extendTheme} from "native-base";

export const Theme = extendTheme({
  colors: {
    pink: {
      300: '#F068AA',
    },
    red: {
      300: '#FF0000',
    },
    green: {
      300: '#00FF00',
    },
    black: {
      300: '#000000',
    },
    white: {
      300: '#FFFFFF',
    },
    //accent: '#F068AA',
    //background: '#FFFFFF',
    //text: '#000000',
    //negative: '#ff0000',
    //positive: '#00ff00',
  },
  fonts: {
    heading: "OpenSans",
    body: "OpenSans",
    mono: "OpenSans",
  },
})