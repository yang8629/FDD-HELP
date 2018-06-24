import React from 'react';
import { createDrawerNavigator, TabNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import Help from './components/Help';

const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
    },
    HOME: {
        screen: Home,
    },
    Help: {
        screen: Help,
    }
},
    { headerMode: 'float' }
)

const AccountStack = createStackNavigator({
    Account: {
        screen: Account,
    },
}, )

export const DrawerRouter = createDrawerNavigator({
    Home: {
        screen: LoginStack,
    },
    Account: {
        screen: AccountStack,
    },
    LogOut: {
        screen: Login,
    }
},
    { headerMode: 'float' }
);

