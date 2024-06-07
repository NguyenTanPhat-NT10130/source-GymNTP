import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ margin: 50 }}>Home Page!!!</Text>
        </View>
    );
  }

}
export default Home;