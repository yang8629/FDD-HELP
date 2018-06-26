import React, { Component } from 'react'
import { Alert, Platform, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Constants, Permissions, Location } from 'expo';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import Database from '../firebase';

export default class Home extends Component {
    state = {
        region: {
            longitude: 121.544637,
            latitude: 25.024624,
            longitudeDelta: 0.01,
            latitudeDelta: 0.02,
        },
        myregion: {
            longitude: null,
            latitude: null,
        },
        errorMessage: null
    }

    static navigationOptions = ({ navigation }) => {
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

    componentWillMount() {
        //確認IOS
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
            Alert.alert(errorMessage);
        } else {
            this._getLocationAsync();
        }

        // var user = Database.auth.currentUser;
        // if (user == null) {
        //     this.props.navigation.navigate('Login')
        // };
    }

    onRegionChangeComplete = (region) => {
        this.setstate({ region });
    }

    _getLocationAsync = async () => {
        let status = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        };

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                longitudeDelta: 0.01,
                latitudeDelta: 0.02
            },
            myregion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
        });
    };

    _setMyLocation = () => {
        this.props.navigation.navigate('Help', { ...this.state.myregion })
        //Database.data.ref().child('position').child('yang').set(this.state.myregion)
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    region={this.state.region}
                    style={styles.container}
                    onRegionChangeComplet={this.onRegionChangeComplet}
                >
                    <Marker
                        coordinate={{ latitude: Number(this.state.myregion.latitude), longitude: Number(this.state.myregion.longitude) }}
                        image={require("./img/mark80.png")}
                        anchor={{ x: 0.5, y: 0 }}
                        title={"嗨"}
                        description={"你在這"} />
                    <View style={styles.header}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.openDrawer()}>
                            <Image
                                source={require("./img/Joe.jpg")}
                                style={styles.head}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <Icon
                        raised
                        name="my-location"
                        color='white'
                        containerStyle={styles.getLocation}
                        onPress={this._getLocationAsync}
                    />
                    <Text
                        onPress={() => this._setMyLocation()}
                        style={styles.help}>HELP</Text>
                </MapView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    header: {
        position: 'absolute',
        marginLeft: 0,
        marginTop: 15,
        height: 76,
        width: 90,
        padding: 0,
        borderBottomRightRadius: 38,
        borderTopRightRadius: 38,
        backgroundColor: '#00BFFF',
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
    head: {
        marginLeft: 20,
        marginTop: 5,
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
    getLocation: {
        position: 'absolute',
        marginTop: 530,
        marginLeft: 340,
        backgroundColor: '#517fa4',
    },
    help: {
        position: 'absolute',
        padding: 10,
        marginTop: 600,
        marginLeft: 280,
        fontSize: 35,
        fontWeight: '500',
        color: 'white',
        borderColor: 'transparent',
        borderRadius: 30,
        backgroundColor: 'red',
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
})