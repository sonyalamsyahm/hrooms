import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Input, Item, Header} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {URL} from '../../configurations/api';
import AsyncStorage from '@react-native-community/async-storage';
import {cosFont} from '../font';

export default class login extends Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
      showPass: true,
      icon: 'eye',
      email: false,
      password: false,
      loading: false,
    };
  }

  validationOfEmail = input => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({inputEmail: input});
    if (reg.test(input) === false) {
      this.setState({email: false});
    } else {
      this.setState({email: true});
    }
  };

  validationOfPassword = input => {
    let word = input.length;
    this.setState({inputPassword: input});
    if (word < 2) {
      this.setState({password: false});
    } else {
      this.setState({password: true});
    }
  };

  btnLogin = () => {
    let {email, password} = this.state;
    if (email === true && password === true) {
      return false;
    } else {
      return true;
    }
  };

  handleSecureText = () => {
    if (this.state.showPass) {
      this.setState({showPass: false, icon: 'eye-off'});
    } else {
      this.setState({showPass: true, icon: 'eye'});
    }
  };

  handleLogin = () => {
    URL.post(`login`, {
      email: this.state.inputEmail,
      password: this.state.inputPassword,
    })
      .then(async res => {
        let data = {
          id: res.data.id,
          token: res.data.token,
        };
        await AsyncStorage.setItem('user', JSON.stringify(data));
        this.setState({loading: true});
        this.props.navigation.navigate('Private');
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginForm = () => {
    return (
      <View
        style={{
          backgroundColor: 'rgba(240, 98, 193, 0.4)',
          height: 260,
          justifyContent: 'flex-end',
          marginHorizontal: 10,
          width: Dimensions.get('window').width - 30,
          borderRadius: 15,
        }}>
        {/* <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontFamily: cosFont, fontSize: 20}}>Login</Text>
        </View> */}
        <Item regular style={[styles.item, {marginBottom: 7}]}>
          <Icon style={styles.icon} name="email" />
          <Input
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgb(60,60,60)"
            onChangeText={input => this.validationOfEmail(input)}
          />
        </Item>
        <Item regular style={[styles.item, {marginBottom: 15}]}>
          <Icon style={styles.icon} name="lock" />
          <Input
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgb(60,60,60)"
            onChangeText={input => this.validationOfPassword(input)}
            secureTextEntry={this.state.showPass}
          />
          <Icon
            name={this.state.icon}
            style={{fontSize: 25, marginRight: 10}}
            onPress={() => this.handleSecureText()}
          />
        </Item>
        <Button
          title="Login"
          titleStyle={{fontSize: 20, fontFamily: cosFont}}
          buttonStyle={{
            backgroundColor: 'rgba(240, 98, 193, 1)',
            marginHorizontal: 15,
            height: 45,
            borderRadius: 10,
            marginBottom: 5,
          }}
          disabled={this.btnLogin()}
          disabledStyle={{backgroundColor: 'rgba(169,169,169,0.5)'}}
          loading={this.state.loading}
          onPress={() => this.handleLogin()}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <Text style={{fontFamily: cosFont, fontSize: 14}}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text
              style={{
                fontFamily: cosFont,
                fontSize: 14,
                color: 'blue',
              }}>
              Register here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.containter}>
        <StatusBar backgroundColor="rgba(240, 98, 193, 1)" />
        <ImageBackground
          style={styles.background}
          source={require('../../../background/background.jpg')}>
          <View style={[{flex: 2.5}, styles.view]}>
            <Image
              style={{
                width: 260,
                // height: 280,
                resizeMode: 'contain',
                // marginBottom: 100,
              }}
              source={require('../../../background/Logo.png')}
            />
          </View>
          <View style={[{flex: 3}, styles.view]}>{this.loginForm()}</View>
          <View style={[{flex: 1}, styles.view]}>
            <Text style={{fontFamily: cosFont, fontSize: 12}}>
              {'\u00A9'} DumbWays.id Batch 12
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    height: 45,
  },
  icon: {
    fontSize: 25,
    marginLeft: 5,
    color: 'black',
  },
  input: {
    fontSize: 17,
    color: 'black',
    fontFamily: cosFont,
  },
});
