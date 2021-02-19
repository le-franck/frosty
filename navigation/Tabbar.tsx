import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../views/Home";
import RepositoryView from '../views/Repository';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS_THEME } from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();



const Tabbar = () => {

    const MyTabBar = ({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) => {

        const icon = (name: string, isFocused: boolean) => {
            switch (name) {
                case "Home":
                    return <Icon name={"home"} size={32} color={isFocused ? COLORS_THEME.info : COLORS_THEME.text_tertiary} />
                case "Repos":
                    return <Icon name={"github"} size={32} color={isFocused ? COLORS_THEME.info : COLORS_THEME.text_tertiary} />
                default:
                    break;
            }
        }

        return (
            <View style={styles.tabBarWrapper}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
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

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.textWrapper}
                            key={index}
                        >
                            <Text style={[styles.text, { color: isFocused ? COLORS_THEME.info : COLORS_THEME.border_tertiary }]}>
                                {icon(route.name, isFocused)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    return (
        <Tab.Navigator tabBar={props => <MyTabBar state={props.state} descriptors={props.descriptors} navigation={props.navigation} />} >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Repos" component={RepositoryView} />
            <Tab.Screen name="Home2" component={Home} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS_THEME.bg_primary,
        height: 48,
        borderTopColor: COLORS_THEME.border_primary,
        borderTopWidth: 1,
    },
    textWrapper: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        alignSelf: "center"
    },
    text: {

    }
});


export default Tabbar;