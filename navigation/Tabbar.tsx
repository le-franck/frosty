import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../views/Home";
import RepositoryView from '../views/Repository';

const Tab = createBottomTabNavigator();

const Tabbar = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Repos" component={RepositoryView} />
            <Tab.Screen name="Home3" component={Home} />
        </Tab.Navigator>
    );
}

export default Tabbar;