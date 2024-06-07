import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Dashboard extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ margin: 50 }}>Dashboard Page!</Text>
        </View>
    );
  }

}
export default Dashboard;