import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS_THEME } from '../utils/constants';
import RepositoriesWrapper from '../views/RepositoriesWrapper';
import Animated from 'react-native-reanimated';
import RepositoriesStarredWrapper from '../views/RepositoriesStarredWrapper';

const Tab = createMaterialTopTabNavigator();

const TABS = {
    TOP: "Top",
    SAVED: "Saved"
}

const TopBar = () => {

    const MyTabBar = ({ state, descriptors, navigation, position }: { state: any, descriptors: any, navigation: any, position: any }) => {
        return (
            <View style={styles.tabBarWrapper}>
                {state.routes.map((route: { key: string; name: string; }, index: number) => {
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

                    const inputRange = state.routes.map((_: any, i: number) => i);
                    const opacity = Animated.interpolate(position, {
                        inputRange,
                        outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
                    });


                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[styles.textWrapper]}
                            key={index}
                        >
                            <Animated.Text style={[styles.text, isFocused && styles.textFocus]}>
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
            <Tab.Screen name={TABS.SAVED} component={RepositoriesStarredWrapper} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: COLORS_THEME.bg_primary,
        alignItems: "stretch"
    },
    textWrapper: {
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        display: "flex",
        alignItems: "center",

    },
    text: {
        color: COLORS_THEME.text_tertiary,
        fontWeight: "500",
        fontSize: 16,
    },
    textFocus: {
        color: COLORS_THEME.info,
    }
});


export default TopBar;