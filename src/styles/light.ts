import {extendTheme} from "native-base";

export const Theme = extendTheme({
  colors: {
    accent: {
      300: '#F068AA',
    },
     negative: {
      300: '#F06868',
    },
    positive: {
      300: '#36cc78',
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
    heading: "OpenSansBold",
    body: "OpenSans",
    bodyBold: "OpenSansBold",
    balance: "KodchasanSemiBold",
    record: "KodchasanBold",
  },
})