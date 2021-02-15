import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../views/Home";

const Tab = createBottomTabNavigator();

const Tabbar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Home2" component={Home} />
            <Tab.Screen name="Home3" component={Home} />

        </Tab.Navigator>
    );
}

export default Tabbar;