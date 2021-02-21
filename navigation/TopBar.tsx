import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../views/Home";
import RepositoryNavigator from '../views/RepositoryNavigator';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS_THEME } from '../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../views/Profile';
import RepositoriesNavigator from './RepositoriesNavigator';
import RepositoriesWrapper from '../views/RepositoriesWrapper';
import Animated from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const TABS = {
    TOP: "Top",
    SAVED: "Saved"
}

const TopBar = () => {

    const MyTabBar = ({ state, descriptors, navigation, position }: { state: any, descriptors: any, navigation: any, position: any }) => {

        return (
            <View style={styles.tabBarWrapper}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const inputRange = state.routes.map((_, i) => i);
                    const opacity = Animated.interpolate(position, {
                        inputRange,
                        outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                    });

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.textWrapper}
                        >
                            <Animated.Text style={[{ color: isFocused ? COLORS_THEME.info : COLORS_THEME.text_secondary }]}>
                                {label}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    return (
        <Tab.Navigator tabBar={props => <MyTabBar state={props.state} descriptors={props.descriptors} navigation={props.navigation} position={props.position} />} >
            <Tab.Screen name={TABS.TOP} component={RepositoriesWrapper} />
            <Tab.Screen name={TABS.SAVED} component={RepositoriesWrapper} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS_THEME.bg_primary,
        height: 24,
        paddingTop: 8,
    },
    textWrapper: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        alignSelf: "center"
    },
    text: {
        color: COLORS_THEME.text_secondary
    }
});


export default TopBar;