import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TextInput, Image } from 'react-native'
import { Constants, Facebook, LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
import Database from '../firebase';

export default class Signup extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    state = {
        username: null,
        email: null,
        password: null,
        password2: null,
    };

    _setUsername = (username) => {
        this.setState({ username })
    };

    _setEmail = (email) => {
        this.setState({ email })
    };

    _setPassword = (password) => {
        this.setState({ password })
    };

    _setPassword2 = (password2) => {
        this.setState({ password2 })
    };

    _confirm = async () => {
        if (this.state.username != null) {
            if (this.state.email != null) {
                if (this.state.password != null) {
                    if (this.state.password == this.state.password2) {
                        try {
                            await Database.auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
                            this.props.navigation.navigate('HOME');
                            var user = Database.auth.currentUser;
                            if (user != null) {
                                Database.data.ref('/user/').child(user.uid).child('username').set(this.state.username)
                                Alert.alert('Welcome ' + this.state.username);
                            };
                        }
                        catch (e) {
                            var errorMessage = e.message;
                            Alert.alert('錯誤', errorMessage);
                        }
                    }
                    else { Alert.alert('錯誤', '密碼不相同'); }
                }
                else { Alert.alert('錯誤', '密碼不可為空'); }
            }
            else { Alert.alert('錯誤', '信箱不可為空'); }
        }
        else { Alert.alert('錯誤', '名稱不可為空'); }
    }

    _cancel = () => {
        this.props.navigation.goBack()
    };

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['black', 'white']} style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.paragraph}>
                        註冊
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder='請輸入稱呼'
                        placeholderTextColor='white'
                        keyboardAppearance='dark'
                        onChangeText={(username) => this._setUsername(username)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='請輸入信箱'
                        placeholderTextColor='white'
                        keyboardAppearance='dark'
                        keyboardType='email-address'
                        onChangeText={(email) => this._setEmail(email)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='請輸入密碼'
                        placeholderTextColor='white'
                        keyboardAppearance='dark'
                        onChangeText={(password) => this._setPassword(password)}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='確認密碼'
                        placeholderTextColor='white'
                        keyboardAppearance='dark'
                        onChangeText={(password2) => this._setPassword2(password2)}
                        secureTextEntry={true}
                    />

                    <Button
                        title="確認"
                        onPress={() => this._confirm()}
                        color="#fff"
                        titleStyle={({ fontWeight: 700 }, { fontSize: 32 })}
                        buttonStyle={styles.buttonStyle}
                    />

                    <Button
                        title="取消"
                        onPress={() => this._cancel()}
                        color="#fff"
                        titleStyle={({ fontWeight: '700' }, { fontSize: 32 })}
                        buttonStyle={styles.buttonStyle}
                    />
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    textInput: {
        width: 300,
        height: 44,
        padding: 8,
        margin: 10,
        color: 'white',
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: 'white',
        textAlign: 'center',
    },
    paragraph: {
        marginTop: 90,
        marginBottom: 50,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    buttonStyle: {
        backgroundColor: 'red',
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
});
