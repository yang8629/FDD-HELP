import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback, } from 'react-native'
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import Database from '../firebase';

export default class Help extends Component {

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

    _setMyLocation = (params) => {
        Database.data.ref().child('position').child('yang').set(params)
    }

    render() {        
        const { params } = this.props.navigation.state
        return (
            <View style={styles.container}>
                <View style={{ flex: 3, backgroundColor: 'gray' }}>
                </View>
                <Text style={styles.score}>20</Text>
                <View style={{ flex: 7 }}>
                    <Text style={styles.text}>
                        Event:        {'\n'}{'\n'}
                        Location:     {'\n'}{'\n'}
                        Detail:       {'\n'}{'\n'}
                    </Text>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        marginTop: 100, paddingLeft: 40, paddingRight: 40
                    }}>
                        <Text style={{
                            flex: 1,
                            width: 200,
                            borderColor: 'black',
                            borderWidth: 3,
                            paddingLeft: 50,
                            fontSize: 35
                        }}
                            onPress={() => this.props.navigation.goBack()}>Back</Text>
                        <Text style={{
                            flex: 1,
                            width: 200,
                            justifyContent: 'center',
                            backgroundColor: 'green',
                            borderColor: 'black',
                            borderWidth: 3,
                            paddingLeft: 13,
                            fontSize: 35
                        }}
                            onPress={() => this._setMyLocation(params)}>Accept</Text>
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
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
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        padding: 15,
        marginTop: 160,
        marginLeft: 300,
        height: 100,
        width: 100,
        fontSize: 40,
        color: 'lightblue',
        borderRadius: 50,
        borderColor: 'lightblue',
        borderWidth: 10,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
    text: {
        paddingTop: 40,
        paddingLeft: 20,
        fontSize: 30,
    }
})