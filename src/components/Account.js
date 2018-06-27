import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { Constants, LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import Database from '../firebase';

export default class Account extends Component {
    state = {
        username: null,
        email: null,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            Title: '個人資料',
            drawerLabel: 'Account',
            //header: null,
            headerStyle: {
                height: 80,
                backgroundColor: 'white',
            },
            headerLeft: (
                <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require("./img/Joe.jpg")}
                        style={styles.head}
                    />
                </TouchableWithoutFeedback>
            ),
            headerRight: (
                <Icon
                    name='settings'
                    size={40}
                    containerStyle={styles.csetting}
                />

            ),
        }
    };

    componentWillMount() {
        var user = Database.auth.currentUser;

        if (user != null) {
            Database.data.ref('/user/' + user.uid).once('value', snapshot => {
                var username = snapshot.child('username').val()
                this.setState({ username })
            });
            var email = user.email;
            this.setState({ email })
        };
    }

    render() {
        return (

            <View style={styles.container}>
                <LinearGradient colors={['black', 'white']} style={{ flex: 1 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require("./img/Joe.jpg")}
                            style={styles.container_head}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.text}>
                            名稱:
                    </Text>
                        <Text style={styles.text_r}>
                            {this.state.username}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>
                            信箱:
                    </Text>
                        <Text style={styles.text_r}>
                            {this.state.email}
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    head: {
        marginLeft: 12,
        marginTop: 2,
        height: 66,
        width: 66,
        borderRadius: 33,
        borderColor: 'white',
    },
    container_head: {
        height: 120,
        width: 120,
        marginTop: 10,
        borderRadius: 60,
        borderColor: 'white',
    },
    csetting: {
        marginRight: 8,
        marginTop: 2,
        height: 70,
        width: 70,
    },
    text: {
        fontSize: 25,
        marginTop: 10,
        marginLeft: 10,
        color: 'white',
    },
    text_r: {
        fontSize: 25,
        marginTop: 10,
        marginRight: 10,
        color: 'white',
    }
})