import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

// redux
import { connect } from 'react-redux';
import { monthly } from '../redux/monthly';
const mapStateToProps = (state) => {
  return {
    monthly: state.monthly
  }
};

class MonthlySubscriptions extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         SessionInf: []
    //     };
    // }

    // componentDidMount() {
    //     axios.get("http://localhost:5000/api/get/monthly-subscriptions")
    //         .then((response) => {
    //             this.setState({ SessionInf: response.data });
    //             console.log(response.data)
    //         })
    //         .catch((err) => console.log(err));
    // }

    renderMontly = ({ item }) => {
        const {navigate} = this.props.navigation;
        return (
            <ListItem key={item.MonthlySubscriptionID} 
            onPress={()=> navigate('MonthlyDetail', {monthlyId: item.MonthlySubscriptionID})}
            
            >
                <ListItem.Content  >
                    <ListItem.Title>{item.Name}</ListItem.Title>
                    <ListItem.Subtitle>{item.Cost}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.Duration}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        );
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FlatList 
                style={{ width:'50%'}}
                    data={this.props.monthly.monthly}
                    renderItem={this.renderMontly}
                    keyExtractor={(item) => item.MonthlySubscriptionID.toString()} 
                />
             </View>
        );
    }
}

export default connect(mapStateToProps)(MonthlySubscriptions);
