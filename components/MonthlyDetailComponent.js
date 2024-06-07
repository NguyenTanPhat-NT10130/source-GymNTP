import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
class RenderMonthly extends Component {
  handleChooseMonthly = () => {
    const { monthly, addToCart, customerId, cartItems } = this.props;
    const hasSession = cartItems.some(item => item.type === 'session');
    if (hasSession) {
      Alert.alert("Error", "Cannot add a monthly package when a session package is already in the cart");
      return;
    }
    if (!customerId) {
      Alert.alert("Error", "You must be logged in to add items to the cart");
      return;
    }

    // Kiểm tra xem item cùng loại đã tồn tại trong giỏ hàng chưa
    const existingItem = cartItems.find(item => item.type === 'monthly');
    if (existingItem) {
      Alert.alert("Error", "You already have a monthly package in your cart");
      return;
    }

    try {
      addToCart({
        id: monthly.MonthlySubscriptionID,
        name: monthly.Name,
        price: monthly.Cost,
        type: 'monthly'
      });
      Alert.alert("Success", "Selected successfully");
    } catch (error) {
      Alert.alert("Failure", "The selection process failed");
      console.log(error);
    }
  };
  render() {
    const { monthly, addToCartError } = this.props;
    if (monthly != null) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Payment Page</Text>
          <Text>Subscription Name: {monthly.Name}</Text>
          <Text>Cost: {monthly.Cost}</Text>
          <Text>Duration: {monthly.Duration}</Text>
          {addToCartError && <Text style={{ color: 'red' }}>{addToCartError}</Text>}
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Add to cart?',
              'Are you sure you want to add to cart this month package: ' + monthly.Name + '?',
              [
                { text: 'Cancel', onPress: () => { /* nothing */ } },
                { text: 'OK', onPress: () => this.handleChooseMonthly() }
              ]
            );
          }}>
            <Text>Choose</Text>
          </TouchableOpacity>
        </View>
      );
    }
  return(<View />);
  }
}

// redux
import { connect } from 'react-redux';
import { monthly } from '../redux/monthly';
import { addToCart } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
  return {
    monthly: state.monthly,
    customerId: state.cart.customerId,
    cartItems: state.cart.cartItems,
    addToCartError: state.cart.addToCartError
  }
};
const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});


class MonthlyDetail extends Component {

  render() {

    const monthlyId = parseInt(this.props.route.params.monthlyId); // chuyển về số nguyên từ dữ liệu lấy trong csdl
    const monthly = this.props.monthly.monthly.find(item => item.MonthlySubscriptionID === monthlyId);
    return (
      <RenderMonthly  monthly={monthly} addToCart={this.props.addToCart} customerId={this.props.customerId} cartItems={this.props.cartItems}/>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps) (MonthlyDetail);