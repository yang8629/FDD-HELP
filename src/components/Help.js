import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback, TextInput } from 'react-native'
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import Database from '../firebase';

export default class Help extends Component {
    state = {
        event: null,
        location: null,
        detail: null,
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            header: null,
            // headerStyle: {
            //     height: 80,
            //     backgroundColor:'white',
            // },
            // headerLeft: ( 
            //     <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>               
            //         <Image
            //             source={require("./img/Joe.jpg")}
            //             style={styles.head}
            //         />
            //     </TouchableWithoutFeedback>                
            // ),
            // headerRight: (                                
            //     <Icon
            //         name='question-circle'
            //         size = '40'
            //         containerStyle={styles.csetting}
            //     />
            // )
        }
    };

    _setEvent = (event) => {
        this.setState({ event })
    }

    _setLocation = (location) => {
        this.setState({ location })
    }

    _setDetail = (detail) => {
        this.setState({ detail })
    }

    _setMyLocation = (params) => {
        Database.data.ref().child('position').child('yang').set(params)
    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <View style={styles.container}>
                <View style={{ flex: 3, backgroundColor: 'gray' }}>
                </View>
                <View style={{ flex: 7 }}>
                    <View style={styles.main}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>
                                事件:
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='請輸入事件'
                                onChangeText={(event) => this._setEvent(event)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>
                                地點:
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='請輸入地點'
                                onChangeText={(location) => this._setLocation(location)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>
                                細節:
                            </Text>
                            <TextInput
                                style={styles.textInput_detial}
                                placeholder='請輸入細節'
                                onChangeText={(detail) => this._setDetail(detail)}
                            />
                        </View>
                    </View>

                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        marginBottom: 0, paddingLeft: 40, paddingRight: 40
                    }}>
                        <Text style={{
                            flex: 2,
                            width: 200,
                            color: 'white',
                            marginTop: 10,
                            borderColor: 'black',
                            borderWidth: 3,
                            paddingLeft: 30,
                            fontSize: 35
                        }}
                            onPress={() => this.props.navigation.goBack()}>取消</Text>
                        <View style={{
                            width: 0,
                            height: 0,
                            borderColor: 'transparent',
                            borderLeftWidth: 40,
                            borderRightWidth: 40,
                            borderTopWidth: 30,
                            borderTopColor: 'white'
                        }} />
                        <Text style={{
                            flex: 2,
                            width: 200,
                            color: 'white',
                            justifyContent: 'center',
                            marginTop: 10,
                            borderColor: 'black',
                            borderWidth: 3,
                            paddingLeft: 30,
                            fontSize: 35
                        }}
                            onPress={() => this._setMyLocation(params)}>送出</Text>
                    </View>
                </View>
                <View style={styles.score_view}>
                    <Text style={styles.score}>20</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'black',
    },
    head: {
        marginLeft: 12,
        marginTop: 2,
        height: 66,
        width: 66,
        borderRadius: 33,
        borderColor: 'white',
    },
    csetting: {
        marginRight: 8,
        marginTop: 2,
        height: 70,
        width: 70,
    },
    score: {
        padding: 15,
        fontSize: 40,
        color: 'black',
    },
    score_view: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: 160,
        marginLeft: 300,
        height: 100,
        width: 100,
        backgroundColor: 'red',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 10,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
    main: {
        flex: 6,
        margin: 5,
        marginBottom: 0,
        borderRadius: 50,
        backgroundColor: 'white',
    },
    textInput: {
        width: 280,
        height: 44,
        padding: 8,
        marginTop: 20,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: '#000',
        textAlign: 'center',
    },
    textInput_detial: {
        width: 280,
        height: 88,
        padding: 8,
        marginTop: 20,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: '#000',
        textAlign: 'center',
    },
    text: {
        margin: 15,
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 25,
    }
})