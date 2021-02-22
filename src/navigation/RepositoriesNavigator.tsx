import React from 'react';
import { StyleSheet, Image, Share, View } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import RepositoriesStarredWrapper from '../views/RepositoriesStarredWrapper';
import RepositoriesWrapper from '../views/RepositoriesWrapper';
import RepositoryWrapper from '../views/RepositoryWrapper';
import { COLORS_THEME } from '../utils/constants';
import TopBar from './TopBar';
import RepositoryView from '../views/Repository';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { onShare } from '../logic/dataFetch';
const Stack = createStackNavigator();

const RepositoriesNavigator = () => {
    const LogoTitle = () => {
        return (
            <Image
                style={{ width: 32, height: 32, marginVertical: 16 }}
                source={require('../img/GitHub-Mark-Light-120px-plus.png')}
            />
        );
    }

    const ShareButton = ({ route }: { route: any }) => {
        const link: string = "https://github.com/" + route.params.fullname;
        return (<TouchableOpacity onPress={() => onShare(link)}>
            <Icon name={"share"} size={25} color={COLORS_THEME.info}></Icon>
        </TouchableOpacity >)
    }

    return (
        //headerMode={"none"} to not show the header with the name of the scree
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: COLORS_THEME.bg_primary,
                height: 56,
            },
            headerTintColor: COLORS_THEME.info,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: () => <LogoTitle />,
            headerBackTitle: 'Back',

        }}

        >
            <Stack.Screen name="MostRepositories" component={TopBar} />
            <Stack.Screen name="Repository" component={RepositoryWrapper} options={({ route }) => ({ headerRight: () => <ShareButton route={route} />, headerRightContainerStyle: { marginRight: 8 } })} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: COLORS_THEME.bg_primary
    }
});



export default RepositoriesNavigator;