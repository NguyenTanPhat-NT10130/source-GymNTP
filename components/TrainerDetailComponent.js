import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addToCart } from '../redux/ActionCreators';

class RenderTrainerDetail extends Component {
  handleChooseTrainer = () => {
    const { trainerDetail, addToCart, customerId, cartItems } = this.props;

    if (!customerId) {
      Alert.alert("Error", "You must be logged in to add items to the cart");
      return;
    }

    const existingItem = cartItems.find(item => item.type === 'trainer');
    if (existingItem) {
      Alert.alert("Error", "You already have a trainer package in your cart");
      return;
    }
    try {
      addToCart({
        id: trainerDetail.TrainerID,
        name: trainerDetail.TrainerName,
        price: trainerDetail.Cost,
        type: 'trainer'
      });
      Alert.alert("Success", "Selected successfully");
    } catch (error) {
      Alert.alert("Failure", "The selection process failed");
      console.log(error);
    }
  };

  render() {
    const { trainerDetail, addToCartError } = this.props;
    if (trainerDetail) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Trainer Name: {trainerDetail.TrainerName}</Text>
          <Text>Phone Number: {trainerDetail.PhoneNumber}</Text>
          <Text>Address: {trainerDetail.Address}</Text>
          <Text>Email: {trainerDetail.Email}</Text>
          <Text>Date Of Birth: {trainerDetail.DateOfBirth}</Text>
          <Text>Gender: {trainerDetail.Gender}</Text>
          <Text>Image: {trainerDetail.Image}</Text>
          <Text>Price: {trainerDetail.Cost}</Text>
          {addToCartError && <Text style={{ color: 'red' }}>{addToCartError}</Text>}
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Add to cart?',
              'Are you sure you want to add to cart this trainer : ' + trainerDetail.TrainerName + '?',
              [
                { text: 'Cancel', onPress: () => { /* nothing */ } },
                { text: 'OK', onPress: () => this.handleChooseTrainer() }
              ]
            );
          }}>
            <Text>Choose</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (<View />);
  }
}

const mapStateToProps = (state, ownProps) => {
  const trainerId = parseInt(ownProps.route.params.trainerId);
  return {
    trainerDetail: state.trainer.trainer.find(item => item.TrainerID === trainerId),
    customerId: state.cart.customerId,
    cartItems: state.cart.cartItems,
    addToCartError: state.cart.addToCartError
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderTrainerDetail);
