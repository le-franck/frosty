import React, { useState, useEffect } from 'react';
import Tabbar from './navigation/Tabbar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, NativeEventEmitter, NativeModules, StatusBar, SafeAreaView } from 'react-native';
import { COLORS_THEME } from './utils/constants';
const { StatusBarManager } = NativeModules;

const App = () => {

  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);

  useEffect(() => {
    StatusBarManager && StatusBarManager.getHeight(({ height }: { height: number }) => { setStatusBarHeight(height) });
  }, [])


  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS_THEME.bg_primary }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <Tabbar />
      </SafeAreaView>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;