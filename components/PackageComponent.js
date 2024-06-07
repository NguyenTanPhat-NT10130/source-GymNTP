import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MonthlySubscriptions from './MonthlySubscriptionsComponent';
import MonthlyDetail from './MonthlyDetailComponent';
import SessionSubscriptions from './SessionSubscriptionsComponent';
import SessionDetail from './SessionDetailComponent';
import Payment from './PaymentComponent';
const Stack = createStackNavigator();

const PackageScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ margin: 50 }}>Please select one of the subscription options below to proceed:</Text>
      <Button
        title="Go to Monthly Subscriptions"
        onPress={() => navigation.navigate('MonthlySubscriptions')}
      />
      <Text>Or</Text>
      <Button
        title="Go to Session Subscriptions"
        onPress={() => navigation.navigate('SessionSubscriptions')}
      />
    </View>
  );
};

function MonthlyNavigatorScreen() {
  const MonthlyNavigator = createStackNavigator();
  return (
    <MonthlyNavigator.Navigator
      initialRouteName='Monthly'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <MonthlyNavigator.Screen name='Monthly' component={MonthlySubscriptions} />
      <MonthlyNavigator.Screen name='MonthlyDetail' component={MonthlyDetail} options={{ headerTitle: 'Monthly Detail' }} />
      <MonthlyNavigator.Screen name='Payment' component={Payment} options={{ headerTitle: 'Payment' }} />
    </MonthlyNavigator.Navigator>
  );
}
function SessionyNavigatorScreen() {
  const SessionNavigator = createStackNavigator();
  return (
    <SessionNavigator.Navigator
      initialRouteName='Session'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <SessionNavigator.Screen name='Session' component={SessionSubscriptions} />
      <SessionNavigator.Screen name='SessionDetail' component={SessionDetail} options={{ headerTitle: 'Session Detail' }} />
      <SessionNavigator.Screen name='Payment' component={Payment} options={{ headerTitle: 'Session' }} />
    </SessionNavigator.Navigator>
  );
}
function Package() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="PackageScreen">
        <Stack.Screen name="PackageScreen" component={PackageScreen} options={{ title: 'Package', headerShown: false }} />
        <Stack.Screen name="MonthlySubscriptions" component={MonthlyNavigatorScreen} options={{ title: 'Monthly Subscriptions', headerShown: false }} />
        <Stack.Screen name="SessionSubscriptions" component={SessionyNavigatorScreen} options={{ title: 'Session Subscriptions', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Package;
