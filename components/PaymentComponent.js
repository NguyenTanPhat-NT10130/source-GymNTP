import React, { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { processPayment } from '../redux/ActionCreators';

const PaymentComponent = ({ 
  cartItems, 
  totalCost, 
  customerId, 
  processPayment, 
  paymentStatus, 
  paymentError, 
  addToCartError, 
  navigation }) => {
  useEffect(() => {
    if (paymentStatus === 'success') {
      Alert.alert('Success', 'Payment processed successfully', [
        { text: 'OK', onPress: () => navigation.navigate('MainScreen') }
      ]);
    } else if (paymentStatus === 'failure') {
      Alert.alert('Error', paymentError);
    }
  }, [paymentStatus, paymentError]);
  useEffect(() => {
    if (addToCartError) {
      Alert.alert('Error', addToCartError);
    }
  }, [addToCartError]);
  const handlePayment = () => {
    const paymentData = {
      CustomerID: customerId,
      EmployeeID: null, 
      TrainerID: cartItems.find(item => item.type === 'trainer')?.id || null,
      MonthlySubscriptionID: cartItems.find(item => item.type === 'monthly')?.id || null,
      SessionSubscriptionID: cartItems.find(item => item.type === 'session')?.id || null,
      TotalBill: totalCost,
      StartDate: new Date(),
      EndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) 
    };

    processPayment(paymentData);
  };

  return (
    <View>
      <Text>Customer ID: {customerId}</Text>
      {cartItems.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Cost: {totalCost}{'\u00A0'}VNĐ</Text>
      </View>
      <Button title="Process Payment" onPress={handlePayment} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  totalCost: state.cart.totalCost,
  customerId: state.cart.customerId,
  paymentStatus: state.cart.paymentStatus,
  paymentError: state.cart.paymentError,
  addToCartError: state.cart.addToCartError
});

const mapDispatchToProps = {
  processPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  totalContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
