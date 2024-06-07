import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/ActionCreators'; // Update with the correct path

const Cart = ({ cartItems, totalCost, removeFromCart, customerId, navigation, addToCartError }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name} - {item.price}{'\u00A0'}VNĐ</Text>
      <Button title="Remove" onPress={() => removeFromCart(item.id, item.type)} />
    </View>
  );

  const handleCheckout = () => {
    if (!customerId) {
      alert('Please log in to proceed to checkout');
      return;
    }
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {customerId ? (
        <Text>Customer ID: {customerId}</Text>
      ) : (
        <Text style={styles.errorText}>You are not logged in</Text>
      )}
      {addToCartError && <Text style={styles.errorText}>{addToCartError}</Text>}
      {cartItems.length > 0 ? (
        <View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.type}-${item.id}`}
          />
          <Button title="Checkout" onPress={handleCheckout} />
        </View>
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Cost: {totalCost} VNĐ</Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  totalCost: state.cart.totalCost,
  customerId: state.cart.customerId,
  addToCartError: state.cart.addToCartError
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: (id, type) => dispatch(removeFromCart(id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  itemText: {
    fontSize: 18
  },
  totalContainer: {
    marginTop: 16
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16
  }
});
