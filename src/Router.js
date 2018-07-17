import React from 'react';
import { createDrawerNavigator, TabNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import { ScrollView, Image, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { Constants, LinearGradient } from 'expo';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import Help from './components/Help';
import Signup from './components/Signup';
import Database from './firebase'

function SetFirebase() {
    Database.init()
};

function _logOut() {
    Database.auth.signOut();
    this.props.navigation.navigate('HOME');
};

var abc = SetFirebase();

const LoginStack = createStackNavigator({
    HOME: {
        screen: Home,
    },
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    Help: {
        screen: Help,
    }
},
    {
        headerMode : 'float',
    }
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
},
    {
        //headerMode: 'float',
        //drawerBackgroundColor: 'red',
        //contentOptions: {
        //    inactiveTintColor: 'white',
        //},

        drawerWidth: 180,
        initialRouteName: '主畫面',
        contentOptions: {
            activeTintColor: '#e91e63',
            labelStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        useNativeAnimations: false,
        contentComponent:
            props => (
                <ScrollView>
                    <LinearGradient colors={['black', 'white']} style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                source={require("./components/img/Joe.jpg")}
                                style={{ height: 80, width: 180 }}
                            />
                            <DrawerItems {...props} />
                            <Text style={{ fontSize: 16, marginLeft: 15, marginTop: 5 }} onPress={() => { Database.auth.signOut() }} >登出</Text>
                        </View>
                    </LinearGradient>
                </ScrollView>
            )
    },
);

