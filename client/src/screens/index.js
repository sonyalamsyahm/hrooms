import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import StartScreen from './StartScreen';
import Login from './public/Login';
import CheckinScreen from './private/Checkin';
import RoomScreen from './private/Room';
import CustomerScreen from './private/Customer';
import SettingScreen from './private/Setting';
import Register from './public/Register';
import {cosFont} from './font';

const PrivateTab = createBottomTabNavigator(
  {
    Checkin: {
      screen: CheckinScreen,
      navigationOptions: {
        // header: null,
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={27}
              name={'check-circle'}
            />
          </View>
        ),
      },
    },
    Room: {
      screen: RoomScreen,
      navigationOptions: {
        // header: ,
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={27} name={'bed'} />
          </View>
        ),
      },
    },
    Customer: {
      screen: CustomerScreen,
      navigationOptions: {
        // header: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={27} name={'id-card'} />
          </View>
        ),
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        // header: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={27} name={'cogs'} />
          </View>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgb(240, 98, 193)',
      inactiveTintColor: 'silver',
      labelStyle: {
        fontSize: 15,
        marginTop: -8,
        fontFamily: cosFont,
      },
      style: {
        backgroundColor: '#f5f5f5',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#d0cfd0',
        height: 55,
      },
    },
  },
);
const LoginScreenTab = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

LoginScreenTab.navigationOptions = () => {
  return {
    header: null,
  };
};

const RegisterScreenTab = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
});

RegisterScreenTab.navigationOptions = () => {
  return {
    header: null,
  };
};

const PublicScreen = createStackNavigator({
  Login: LoginScreenTab,
  Register: RegisterScreenTab,
});

const AppContainer = createSwitchNavigator(
  {
    Start: StartScreen,
    Public: PublicScreen,
    Private: PrivateTab,
  },
  {
    initialRouteName: 'Start',
  },
);

export default createAppContainer(AppContainer);
