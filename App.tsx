import React from 'react';
import Tabbar from './src/navigation/Tabbar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { COLORS_THEME } from './src/utils/constants';

const App = () => {

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
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
    flex: 1,//make the app full screen
    backgroundColor: COLORS_THEME.bg_primary //color of outside parts of the app (notch and hom button)
  },
});

export default App;