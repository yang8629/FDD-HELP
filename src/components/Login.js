import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TextInput, Image } from 'react-native'
import { Constants, Facebook } from 'expo';
import { Button } from 'react-native-elements';
import Database from '../firebase';

export default class Login extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    state = {
        inputValue: '',
    };
    state2 = {
        inputValue2: '',
    };


    // _handleTextChange = inputValue => {
    //     this.setState({ inputValue });
    // };

    // _handleTextChange2 = inputValue2 => {
    //     this.setState({ inputValue2 });
    // };

    _loginButtonPress = () => {
        Alert.alert('登入成功');
        this.props.navigation.navigate('HOME')
    };

    _signUpButtonPress = () => {
        // Alert.alert('到註冊畫面');
        this.props.navigation.navigate('signup')
        Database.data.ref().child('111').child('222').set({
            yang: 8629
        })
    };

    _handleFacebookLogin = async () => {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync(
                '1201211719949057', // Replace with your own app id in standalone app
                { permissions: ['public_profile'] }
            );

            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(
                        `https://graph.facebook.com/me?access_token=${token}`
                    );
                    const profile = await response.json();
                    Alert.alert('Logged in!', `Hi ${profile.name}!`);
                    break;
                }
                case 'cancel': {
                    Alert.alert('Cancelled!', 'Login was cancelled!');
                    break;
                }
                default: {
                    Alert.alert('Oops!', 'Login failed!');
                }
            }
        }
        catch (e) {
            Alert.alert('Oops!', 'Login failed!');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    登入
            </Text>

                <TextInput
                    style={styles.textInput}
                    value={this.state.inputValue}
                    placeholder='請輸入帳號'
                //clearTextOnFocus="true"
                />
                <TextInput
                    style={styles.textInput}
                    value={this.state2.inputValue2}
                    placeholder='請輸入密碼'
                //clearTextOnFocus="true"
                />

                <Button
                    title="登入"
                    onPress={this._loginButtonPress}
                    color="#fff"
                    titleStyle={({ fontWeight: 700 }, { fontSize: 32 })}
                    buttonStyle={styles.buttonStyle}
                />

                <Button
                    title="註冊"
                    onPress={this._signUpButtonPress}
                    color="#fff"
                    titleStyle={({ fontWeight: '700' }, { fontSize: 32 })}
                    buttonStyle={styles.buttonStyle}
                />

                <Button
                    title="Login with Facebook"
                    onPress={this._handleFacebookLogin}
                    color="#fff"
                    titleStyle={({ fontWeight: '700' }, { fontSize: 32 })}
                    buttonStyle={styles.FBbuttonStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    textInput: {
        width: 300,
        height: 44,
        padding: 8,
        margin: 10,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: '#000',
        textAlign: 'center',
    },
    paragraph: {
        // flex:2,
        marginTop: 90,
        marginBottom: 80,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    buttonStyle: {
        backgroundColor: '#00BFFF',
        width: 300,
        height: 40,
        borderColor: 'transparent',
        borderWidth: 0.5,
        borderRadius: 4,
        marginTop: 10,
        padding: 0,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
    FBbuttonStyle: {
        backgroundColor: '#3b5998',
        width: 300,
        height: 40,
        borderColor: 'transparent',
        borderWidth: 0.5,
        borderRadius: 4,
        marginTop: 10,
        padding: 0,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
});
