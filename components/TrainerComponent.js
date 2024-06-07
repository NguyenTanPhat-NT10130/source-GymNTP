import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import TrainerDetail from './TrainerDetailComponent';
const Stack = createStackNavigator();

// redux
import { connect } from 'react-redux';
import { trainer } from '../redux/trainer';
const mapStateToProps = (state) => {
  return {
    trainer: state.trainer
  }
};

class Trainer extends Component {
  // componentDidMount() {
    // Fetch data nếu cần, hiện tại dữ liệu từ redux nên không cần axios
    // axios.get("http://localhost:5000/api/get/trainers")
    //   .then((response) => {
    //     this.setState({ TrainerInf: response.data });
    //     console.log(response.data)
    //   })
    //   .catch((err) => console.log(err));
  // }

  renderTrainer = ({ item, navigation }) => {
    return (
      <ListItem key={item.TrainerID} onPress={() => navigation.navigate('TrainerDetail', { trainerId: item.TrainerID })}>
        <ListItem.Content>
          <ListItem.Title>{item.TrainerName}</ListItem.Title>
          <ListItem.Subtitle>{item.PhoneNumber}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.Address}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.Email}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.DateOfBirth}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.Gender}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.Image}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.Cost}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  TrainerScreen = ({navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
        style={{ width:'50%'}}
          data={this.props.trainer.trainer}
          renderItem={({ item }) => this.renderTrainer({ item, navigation })}
          keyExtractor={(item) => item.TrainerID.toString()}
        />
      </View>
    );
  };

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName='TrainerScreen'
          screenOptions={{
            headerStyle: { backgroundColor: '#7cc' },
            headerTintColor: '#fff',
            headerTitleStyle: { color: '#fff' }
          }}>
          <Stack.Screen name='TrainerScreen' component={this.TrainerScreen} />
          <Stack.Screen name='TrainerDetail' component={TrainerDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default connect(mapStateToProps)(Trainer);