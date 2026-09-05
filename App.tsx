import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  BalooTamma2_600SemiBold,
  BalooTamma2_700Bold,
  useFonts as useBalooFonts,
} from '@expo-google-fonts/baloo-tamma-2';
import {
  NotoSansKannada_400Regular,
  NotoSansKannada_600SemiBold,
  useFonts as useNotoKannadaFonts,
} from '@expo-google-fonts/noto-sans-kannada';
import { SplashScreen } from './src/screens/SplashScreen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme';

const logoSource = require('./assets/nitya-pragati.png');

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [balooLoaded] = useBalooFonts({
    BalooTamma2_600SemiBold,
    BalooTamma2_700Bold,
  });
  const [notoLoaded] = useNotoKannadaFonts({
    NotoSansKannada_400Regular,
    NotoSansKannada_600SemiBold,
  });

  const fontsLoaded = balooLoaded && notoLoaded;

  if (!fontsLoaded || !splashDone) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <SplashScreen logoSource={logoSource} onFinish={() => setSplashDone(true)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AppNavigator logoSource={logoSource} />
    </SafeAreaProvider>
  );
}