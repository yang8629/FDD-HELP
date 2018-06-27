import React from 'react';
import { createDrawerNavigator, TabNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import Help from './components/Help';
import Signup from './components/Signup';
import Database from './firebase'

function SetFirebase() {
    Database.init()
};

var abc = SetFirebase();

const LoginStack = createStackNavigator({
    HOME: {
        screen: Home,
    },
    Login: {
        screen: Login,
    },
    Signup:{
        screen: Signup,
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
    主畫面: {
        screen: LoginStack,
    },
    個人資料: {
        screen: AccountStack,
    },
    登出: {
        screen: Login,
    }
},
    { headerMode: 'float' }
);

