import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            remember: false,
            isPasswordShown: false,
            isConFirmPassShown: false
        }
    }

    handleSignUp = () => {
        const { username, phoneNumber, password, confirmPassword } = this.state;
        
        // Biểu thức chính quy để kiểm tra số điện thoại Việt Nam hợp lệ
        const checkphone = /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-6|8|9]|9[0-4|6-9])\d{7}$/;
    
        // Biểu thức chính quy để kiểm tra tên đầy đủ chỉ chứa chữ cái
        const checkname = /^[a-zA-Z\s]+$/;
    
        if (!username) {
            alert('Full Name is required');
            return;
        }
    
        if (!checkname.test(username)) {
            alert('Invalid name format. Full Name should only contain letters.');
            return;
        }
    
        if (!phoneNumber) {
            alert('Mobile Number is required');
            return;
        }
    
        if (!checkphone.test(phoneNumber)) {
            alert('Invalid phone number format');
            return;
        }
    
        if (!password) {
            alert('Password is required');
            return;
        }
    
        if (!confirmPassword) {
            alert('Confirm Password is required');
            return;
        }
    
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        const data = {
            CusName: username,
            PhoneNumber: phoneNumber,
            Password: password,
            Image: '', // nếu bạn có thêm giá trị cho cột này
            Status: 1, // giá trị mặc định
            Point: 0 // giá trị mặc định
        };
        
        axios.post('https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/post/customers', data)
            .then(response => {
                alert('Account created successfully');
                this.props.navigation.navigate('Login');
            })
            .catch(error => {
                console.error('There was an error creating the account!', error);
            });
    }
    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground
                style={styles.background}
                source={require('./images/Gym.jpg')}
            >
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.container}>
                        <Text style={styles.title}>WELCOME TO OUR GYM</Text>
                        <View style={styles.btn_box}>
                            <View style={styles.ridesFriends}>
                                <TouchableOpacity
                                    style={styles.btn_shape}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={[styles.btn_text, { color: 'black' }]}>Sign In</Text>
                                </TouchableOpacity>
                                <View style={styles.verticleLine}></View>
                                <TouchableOpacity
                                    style={styles.btn_shape}
                                >
                                    <Text style={styles.btn_text}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.FormImput_Container}>
                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Full Name</Text>
                                <View style={styles.input_Containt}>
                                    <TextInput
                                        placeholder='Enter your full name'
                                        keyboardType='default'
                                        onChangeText={(text) => this.setState({ username: text })}
                                    />
                                </View>
                            </View>
                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Mobile Number</Text>
                                <View style={styles.input_Containt}>
                                    <TextInput
                                        placeholder='+84'
                                        placeholderTextColor='#121212'
                                        keyboardType='numeric'
                                        style={{
                                            width: "12%",
                                            borderRightWidth: 1,
                                            borderLeftColor: 'grey',
                                            height: "100%",
                                            color: "#121212",
                                        }}
                                    />
                                    <TextInput
                                        placeholder='Enter your phone number'
                                        keyboardType='numeric'
                                        style={{
                                            width: "80%",
                                        }}
                                        onChangeText={(text) => this.setState({ phoneNumber: text })}
                                    />
                                </View>
                            </View>
                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Password</Text>
                                <View style={styles.input_Containt}>
                                    <TextInput
                                        secureTextEntry={!this.state.isPasswordShown}
                                        autoCorrect={false}
                                        style={styles.input_placeholder}
                                        autoCapitalize="none"
                                        placeholder="Enter your password"
                                        onChangeText={(text) => this.setState({ password: text })}
                                    />
                                    <TouchableOpacity
                                        onPress={() => this.setState({ isPasswordShown: !this.state.isPasswordShown })}
                                        style={{
                                            position: "absolute",
                                            right: 12,
                                        }}
                                    >
                                        {
                                            this.state.isPasswordShown ? (
                                                <Ionicons name="eye" size={24} color='black' />
                                            ) : (
                                                <Ionicons name="eye-off" size={24} color='black' />
                                            )
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Confirm Password</Text>
                                <View style={styles.input_Containt}>
                                    <TextInput
                                        secureTextEntry={!this.state.isConFirmPassShown}
                                        autoCorrect={false}
                                        style={styles.input_placeholder}
                                        autoCapitalize="none"
                                        placeholder="Enter your confirm Password"
                                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                                    />
                                    <TouchableOpacity
                                        onPress={() => this.setState({ isConFirmPassShown: !this.state.isConFirmPassShown })}
                                        style={{
                                            position: "absolute",
                                            right: 12,
                                        }}
                                    >
                                        {
                                            this.state.isConFirmPassShown ? (
                                                <Ionicons name="eye" size={24} color='black' />
                                            ) : (
                                                <Ionicons name="eye-off" size={24} color='black' />
                                            )
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.btn_SignUp} onPress={this.handleSignUp}>
                                <Text style={styles.btn_text}>Create account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    wrapper: {
        flex: 1,
        paddingTop: 100,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#FF9900',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        paddingTop: 10,
        fontSize: 20
    },
    input_box: {
        width: "100%",
        height: 40,
        marginBottom: 10,
        marginTop: 30,
    },
    input_title: {
        color: "#121212",
        marginTop: -20,
    },
    input_placeholder: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        color: "#121212",
        backgroundColor: "rgba(230,230,230,1)",
    },
    input_Containt: {
        width: "100%",
        height: 45,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        backgroundColor: "rgba(230,230,230,1)"
    },
    btn_box: {
        flexDirection: "row",
        width: "75%",
        justifyContent: "center",
    },
    btn_shape: {
        borderRadius: 10,
        width: "40%",
        height: 40,
        marginHorizontal: 5,
        justifyContent: "center",
    },
    btn_text: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    ridesFriends: {
        paddingTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 10,
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: 'black',
    },
    btn_SignUp: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#DA5020',
        marginTop: 20
    },
    FormImput_Container: {
        backgroundColor: '#D9D9D9',
        width: '100%', 
        paddingHorizontal: 10,
        height: '100%', borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

export default SignUp;
