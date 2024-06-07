import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
// redux
import { connect } from 'react-redux';
import { session } from '../redux/session';
const mapStateToProps = (state) => {
  return {
    session: state.session
  }
};
class SessionSubscriptions extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     SessionInf: []
  //   };
  // }
  // componentDidMount() {
  //   axios.get("http://localhost:5000/api/get/session-subscriptions")
  //     .then((response) => {
  //       this.setState({ SessionInf: response.data });
  //       console.log(response.data)
  //     })
  //     .catch((err) => console.log(err));
  // }

  renderSession = ({ item }) => {
    const { navigate } = this.props.navigation;
    return (
      <ListItem key={item.SessionSubscriptionID} onPress={() => navigate('SessionDetail', { sessionId: item.SessionSubscriptionID })}>
        <ListItem.Content>
          <ListItem.Title>{item.Name}</ListItem.Title>
          <ListItem.Subtitle>{item.Cost}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.NumberOfSessions}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

    );
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
        style={{ width:'50%'}}
          data={this.props.session.session}
          renderItem={this.renderSession}
          keyExtractor={(item) => item.SessionSubscriptionID.toString()}
        />
      </View>
    );
  }

}
export default connect(mapStateToProps)(SessionSubscriptions);