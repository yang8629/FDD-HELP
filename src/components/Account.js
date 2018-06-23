import React,{ Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';

export default class Account extends Component {
    static navigationOptions  = ({ navigation }) => {
        return{
            Title: 'Account',
            drawerLabel: 'Account',
            //header: null,
            headerStyle: {
                height: 80,
                backgroundColor:'white',
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
                        size = '40'
                        containerStyle={styles.csetting}
                    />
                
            )
        }
    };

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Name: 莊 X 鈞 {'\n'}{'\n'}
                Mail: tedy@gmail.com {'\n'}{'\n'}
                Phone: 098787-8487
            </Text>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    text: {
        fontSize: 35,
    }
})