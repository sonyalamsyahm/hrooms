import React, {Component} from 'react';
import {Container, Header, Title} from 'native-base';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import {fetchDataUser, fetchChangeImage} from '../../_stores/setting';
import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import {fontTitle, cosFont} from '../font';

class Setting extends Component {
  // componentDidMount() {
  //   this.handleGetUser();
  // }

  constructor() {
    super();
    this.state = {
      isShowModal: false,
    };
  }

  handleGetUser = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      const id = data.id;
      this.props.fetchDataUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  changeImage = async data => {
    try {
      const datas = await getData();
      setHeaderAuth(datas.token);
      const id = datas.id;
      this.props.fetchChangeImage(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  IdentityUser = users => {
    const photo = users.avatar
      ? {uri: users.avatar}
      : require('../../../background/User.png');
    return (
      <View style={styles.horizontal}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 10,
          }}>
          <Image style={styles.Image} source={photo} />
        </View>
        <Text style={fontTitle}>{users.name}</Text>
        <Text style={styles.Text2}>{users.email}</Text>
      </View>
    );
  };

  //handling change image using image picker
  handleChangeImage = () => {
    const options = {
      allowsEditing: false,
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.uri) {
        const data = new FormData();
        data.append('avatar', {
          name: res.fileName,
          type: res.type,
          uri: res.uri,
        });
        this.changeImage(data);
      }
    });
  };

  handleLogout = async () => {
    setHeaderAuth('');
    const data = '';
    await AsyncStorage.setItem('user', data);
    this.props.navigation.navigate('Public');
  };

  validationLogout = () => {
    return (
      <Modal
        isVisible={this.state.isShowModal}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            width: 300,
            borderRadius: 15,
          }}>
          <Text style={{fontSize: 20, marginBottom: 10, fontFamily: cosFont}}>
            Confirmation Logout
          </Text>
          <Text style={{fontSize: 17, fontFamily: cosFont}}>
            {' '}
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Button
              title="Yes"
              titleStyle={{fontSize: 17, fontFamily: cosFont}}
              type="solid"
              buttonStyle={[
                styles.button,
                {marginRight: 5, backgroundColor: '#384cae'},
              ]}
              onPress={() => this.handleLogout()}
            />
            <Button
              title="Cancel"
              titleStyle={{fontSize: 17, fontFamily: cosFont}}
              type="solid"
              buttonStyle={[
                styles.button,
                {marginLeft: 5, backgroundColor: 'silver'},
              ]}
              onPress={() => this.setState({isShowModal: false})}
            />
          </View>
        </View>
      </Modal>
    );
  };

  logout = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Button
          title="Log Out"
          titleStyle={{fontSize: 18, fontFamily: cosFont}}
          buttonStyle={{
            height: 40,
            width: Dimensions.get('window').width - 30,
            borderRadius: 10,
            backgroundColor: '#cf1111',
            marginTop: 10,
          }}
          onPress={() => this.setState({isShowModal: true})}
        />
      </View>
    );
  };

  changeAvatar = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Button
          title="Change Photo"
          titleStyle={{fontSize: 18, fontFamily: cosFont}}
          buttonStyle={{
            height: 40,
            width: Dimensions.get('window').width - 30,
            borderRadius: 10,
            backgroundColor: '#384cae',
            marginTop: 20,
          }}
          onPress={() => this.handleChangeImage()}
        />
      </View>
    );
  };

  render() {
    const {users} = this.props;
    // console.log(JSON.stringify(users.data, null, 2));

    return (
      <Container style={styles.Container}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../../../background/background.jpg')}>
          <Header
            androidStatusBarColor="rgb(240, 98, 193)"
            style={styles.Header}>
            <Title style={fontTitle}>Setting</Title>
          </Header>
          {this.IdentityUser(users.data)}
          {this.changeAvatar()}
          {this.logout()}
          {this.validationLogout()}
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  fetchDataUser,
  fetchChangeImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  horizontal: {
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(240, 98, 193,0.3)',
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 25,
  },
  vertikal: {
    justifyContent: 'center',
    marginLeft: 25,
    flex: 1,
  },
  Text2: {
    fontSize: 18,
    fontFamily: cosFont,
    marginTop: -10,
  },
  Image: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 98, 193)',
    height: 50,
  },
  button: {
    height: 35,
    width: 125,
  },
});
