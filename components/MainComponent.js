import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './LoginComponent';
import SignUp from './SignUpComponent';
import Home from './HomeComponent';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Profile from './ProfileComponent';
import History from './HistoryComponent';
import Cart from './CartComponent';
import Payment from './PaymentComponent';
function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}
function ProfileNavigatorScreen() {
  const ProfileNavigator = createStackNavigator();
  return (
    <ProfileNavigator.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ProfileNavigator.Screen name='Profile' component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Profile',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ProfileNavigator.Navigator>
  );
}
function HistoryNavigatorScreen() {
  const HistoryNavigator = createStackNavigator();
  return (
    <HistoryNavigator.Navigator
      initialRouteName='History'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HistoryNavigator.Screen name='Profile' component={History}
        options={({ navigation }) => ({
          headerTitle: 'History',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HistoryNavigator.Navigator>
  );
}
function LoginNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}>
      <LoginNavigator.Screen name='Login' component={Login} />
      <LoginNavigator.Screen name='SignUp' component={SignUp} />
      <LoginNavigator.Screen name='Home' component={Home} />
      <LoginNavigator.Screen name='MainScreen' component={MainNavigatorScreen} />
    </LoginNavigator.Navigator>
  );
}
function CartNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator
      initialRouteName='Cart'
      screenOptions={{
        headerShown: false
      }}>
      <LoginNavigator.Screen name='Cart' component={Cart} />
      <LoginNavigator.Screen name='Payment' component={Payment} />
      <LoginNavigator.Screen name='MainScreen' component={MainNavigatorScreen} />
    </LoginNavigator.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/Logo.jpg')} style={{ margin: 10, width: 80, height: 60, borderRadius: 15 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>TDK & Friends</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      {/* <DrawerItem label='Help'
        icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} /> */}
    </DrawerContentScrollView>
  );
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from './DashboardComponent';
import Package from './PackageComponent';
import Trainer from './TrainerComponent';
//Screen names
const dashboardName = "dashboard";
const payment = "payment"
const packageName = "package";
const trainerName = "trainer";
const cart = "cart";

const Tab = createBottomTabNavigator();

function MainBottomTab() {
  return (
    <Tab.Navigator
      initialRouteName={dashboardName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === dashboardName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === packageName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === trainerName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          else if (rn === payment) {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          else if (rn === cart) {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 }
      })}
    >

      <Tab.Screen name={dashboardName} component={Dashboard} />
      <Tab.Screen name={packageName} component={Package} options={{headerShown: false}}/>
      <Tab.Screen name={trainerName} component={Trainer} options={{headerShown: false}}/>
      {/* <Tab.Screen name={payment} component={Payment} options={{headerShown: false}}/> */}
      <Tab.Screen name={cart} component={CartNavigatorScreen} options={{headerShown: false}}/>

    </Tab.Navigator>
  )
}
function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          title: 'Home', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ProfileScreen' component={ProfileNavigatorScreen}
        options={{
          title: 'Profile', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='History' component={HistoryNavigatorScreen}
        options={{
          title: 'History', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='loginScreen' component={LoginNavigatorScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen
        name='tabScreen'
        component={MainBottomTab}
        options={{
          title: 'Tabs',
          drawerIcon: ({ focused, size }) => (
            <Icon name='apps' size={size} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}
// redux
import { connect } from 'react-redux';
import {fetchMonthly, fetchSession, fetchTrainer } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchMonthly: () => dispatch(fetchMonthly()),
  fetchSession: () => dispatch(fetchSession()),
  fetchTrainer: () => dispatch(fetchTrainer())
});

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchMonthly();
    this.props.fetchSession();
    this.props.fetchTrainer();
  }
}
export default connect(null, mapDispatchToProps)(Main);