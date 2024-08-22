import {extendTheme} from "native-base";

export const Theme = extendTheme({
  colors: {
    accent: {
      100: 'rgba(240,104,170,0.3)',
      300: '#F068AA',
    },
     negative: {
      300: '#F06868',
    },
    positive: {
      300: '#36cc78',
    },
    black: {
      100: 'rgba(0,0,0,0.5)',
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
    bodySemiBold: "OpenSansSemiBold",
    balance: "KodchasanSemiBold",
    record: "KodchasanBold",
  },
})