import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import RepositoriesStarredWrapper from '../views/RepositoriesStarredWrapper';
import RepositoriesWrapper from '../views/RepositoriesWrapper';
import RepositoryWrapper from '../views/RepositoryWrapper';
import { COLORS_THEME } from '../utils/constants';
import TopBar from './TopBar';
import RepositoryView from '../views/Repository';

const Stack = createStackNavigator();

const RepositoriesNavigator = () => {
    const LogoTitle = () => {
        return (
            <Image
                style={{ width: 32, height: 32 }}
                source={require('../img/GitHub-Mark-Light-120px-plus.png')}
            />
        );
    }

    return (
        //headerMode={"none"} to not show the header with the name of the scree
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: COLORS_THEME.bg_primary,
                height: 56
            },
            headerTintColor: COLORS_THEME.info,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: props => <LogoTitle {...props} />,
            headerBackTitle: 'Back',
        }}

        >
            <Stack.Screen name="MostRepositories" component={TopBar} />
            <Stack.Screen name="Repository" component={RepositoryWrapper} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: COLORS_THEME.bg_primary
    }
});



export default RepositoriesNavigator;