import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView
} from "react-native";
import { CheckBox } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
      remember: false,
      isPasswordShown: false,
      message: '', // Thêm state để lưu thông báo
      messageType: '', // Thêm state để lưu loại thông báo (success hoặc error)
    };
  }

  handleLogin = () => {
    const { phoneNumber, password } = this.state;
    const { navigate } = this.props.navigation;
    // Biểu thức chính quy để kiểm tra số điện thoại Việt Nam hợp lệ
    const checkphone = /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-6|8|9]|9[0-4|6-9])\d{7}$/;

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

    console.log('Login button pressed');
    console.log('Phone Number:', phoneNumber);
    console.log('Password:', password);

    axios.post('https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/post/login', { PhoneNumber: phoneNumber, Password: password })
  .then(response => {
    console.log('Response:', response.data);
    const customerId = response.data.customerId; // Đảm bảo customerId có trong response.data
    if (!customerId) {
      throw new Error('CustomerId is missing in the response');
      
    }
    this.setState({
      message: response.data.message,
      messageType: 'success'
    });
    this.props.setCustomerId(customerId); // Sử dụng customerId lấy từ phản hồi
    navigate("MainScreen");
  })
  .catch(error => {
    if (error.response) {
      console.log('Error Response:', error.response.data);
      this.setState({
        message: error.response.data.message,
        messageType: 'error'
      });
    } else {
      console.log('Error:', error.message);
      this.setState({
        message: 'An error occurred. Please try again.',
        messageType: 'error'
      });
    }
  });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { message, messageType } = this.state;
    return (
      <ImageBackground
        style={[styles.background, { backgroundColor: 'white' }]}
        source={require('./images/Gym.jpg')}
      >
        <SafeAreaView style={styles.wrapper}>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>WELCOME TO OUR GYM</Text>
              <View style={styles.btn_box}>
                <View style={styles.ridesFriends}>
                  <TouchableOpacity
                    style={styles.btn_shape}
                  >
                    <Text style={styles.btn_text}>Sign In</Text>
                  </TouchableOpacity>
                  <View style={styles.verticleLine}></View>
                  <TouchableOpacity
                    style={styles.btn_shape}
                    onPress={() => navigate('SignUp')}
                  >
                    <Text style={[styles.btn_text, { color: 'black' }]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {message ? (
                <Text style={[styles.message, messageType === 'success' ? styles.success : styles.error]}>
                  {message}
                </Text>
              ) : null}
              <View style={styles.FormImput_Container}>
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
                <View style={{ flexDirection: 'row' }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: -10,
                    marginRight: 107,
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CheckBox
                        containerStyle={{ backgroundColor: null, padding: 0, margin: 0 }}
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })} />
                      <Text style={{ marginLeft: -10, fontSize: 12 }}>Remember me?</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Text>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.btn_SignIn} onPress={this.handleLogin}>
                  <Text style={styles.btn_text}>Sign In</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginTop: 10 }}>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: 'grey',
                      marginHorizontal: 10
                    }}
                  />
                  <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: 'grey',
                      marginHorizontal: 10
                    }}
                  />
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10
                }}>
                  <TouchableOpacity
                    onPress={() => console.log("Pressed")}
                    style={styles.icon}
                  >
                    <Image
                      source={require("../assets/facebook.png")}
                      style={{
                        height: 36,
                        width: 36,
                        marginRight: 8
                      }}
                      resizeMode='contain'
                    />
                    <Text>Facebook</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => console.log("Pressed")}
                    style={styles.icon}
                  >
                    <Image
                      source={require("../assets/google.png")}
                      style={{
                        height: 36,
                        width: 36,
                        marginRight: 8
                      }}
                      resizeMode='contain'
                    />
                    <Text>Google</Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 22
                }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>Already have an account?</Text>
                  <Pressable
                    onPress={() => navigate("SignUp")}
                  >
                    <Text style={{
                      fontSize: 16,
                      color: '#007260',
                      fontWeight: "bold",
                      marginLeft: 6
                    }}>Login</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
import { connect } from 'react-redux';
import { setCustomerId } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  setCustomerId: (customerId) => dispatch(setCustomerId(customerId))
});
export default connect(null, mapDispatchToProps) (Login);

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
    paddingTop: 25,
    fontSize: 20
  },
  input_box: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    marginTop: 40,
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
  loading: {
    padding: 25,
  },
  ridesFriends: {
    paddingTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
  },
  btn_SignIn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#DA5020',
    marginTop: 40
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  FormImput_Container: {
    backgroundColor: '#D9D9D9',
    width: '100%', paddingHorizontal: 10,
    height: '100%', borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  message: {
    fontSize: 16,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  }
});


