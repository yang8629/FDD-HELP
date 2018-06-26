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
        username: null,
        email: null,
        password: null,
    };

    componentWillMount() {
        var user = Database.auth.currentUser;
        if (user != null) {
            Database.auth.signOut()
        };
    };


    _setEmail = (email) => {
        this.setState({ email })
    };

    _setPassword = (password) => {
        this.setState({ password })
    };

    _loginButtonPress = async () => {
        if (this.state.email != null) {
            if (this.state.password != null) {
                try {
                    await Database.auth.signInWithEmailAndPassword(this.state.email, this.state.password);
                    this.props.navigation.navigate('HOME')
                    var user = Database.auth.currentUser;
                    if (user != null) {
                        Database.data.ref('/user/' + user.uid).once('value').then(function (snapshot) {
                            var username = snapshot.child('username').val()
                            Alert.alert('歡迎 ' + username);
                        });
                    };
                }
                catch (e) {
                    var errorMessage = e.message;
                    Alert.alert('錯誤', errorMessage);
                }
            }
            else { Alert.alert('錯誤', '密碼不可為空'); }
        }
        else { Alert.alert('錯誤', '信箱不可為空'); }

    };

    _signUpButtonPress = () => {
        Alert.alert('到註冊畫面');
        this.props.navigation.navigate('Signup')
    };

    // _handleFacebookLogin = async () => {
    //     try {
    //         const {
    //             type,
    //             token,
    //         } = await Facebook.logInWithReadPermissionsAsync(
    //             '1201211719949057', // Replace with your own app id in standalone app
    //             { permissions: ['public_profile'] }
    //         );

    //         switch (type) {
    //             case 'success': {
    //                 // Get the user's name using Facebook's Graph API
    //                 const response = await fetch(
    //                     `https://graph.facebook.com/me?access_token=${token}`
    //                 );
    //                 const profile = await response.json();
    //                 Alert.alert('Logged in!', `Hi ${profile.name}!`);
    //                 break;
    //             }
    //             case 'cancel': {
    //                 Alert.alert('Cancelled!', 'Login was cancelled!');
    //                 break;
    //             }
    //             default: {
    //                 Alert.alert('Oops!', 'Login failed!');
    //             }
    //         }
    //     }
    //     catch (e) {
    //         Alert.alert('Oops!', 'Login failed!');
    //     }
    // };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 3 }}>

                    <Text style={styles.paragraph}>
                        登入
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder='請輸入信箱'
                        onChangeText={(email) => this._setEmail(email)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder='請輸入密碼'
                        onChangeText={(password) => this._setPassword(password)}
                        secureTextEntry={true}
                    />

                </View>

                <View style={{ flex: 2 }}>

                    <Button
                        title="登入"
                        onPress={() => this._loginButtonPress()}
                        color="#fff"
                        titleStyle={({ fontWeight: 700 }, { fontSize: 32 })}
                        buttonStyle={styles.buttonStyle}
                    />

                    <Button
                        title="註冊"
                        onPress={() => this._signUpButtonPress()}
                        color="#fff"
                        titleStyle={({ fontWeight: '700' }, { fontSize: 32 })}
                        buttonStyle={styles.buttonStyle}
                    />

                    {/* <Button
                    title="Login with Facebook"
                    onPress={() => this._handleFacebookLogin()}
                    color="#fff"
                    titleStyle={({ fontWeight: '700' }, { fontSize: 32 })}
                    buttonStyle={styles.FBbuttonStyle}
                    /> */}

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 50,
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
        marginTop: 15,
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
