import GlobalContext from '../contexts/Global';
import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function App() {
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/Open-Sans.ttf'),
    });

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    if (!loaded) {
        return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
    }

    return (
      <GlobalContext.Provider value={{ name: 'Lorem Ipsum', setName: () => {} }}>
          <Slot />
      </GlobalContext.Provider>
    );
}
