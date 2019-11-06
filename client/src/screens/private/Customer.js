import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Header, Fab, Title} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import {
  getAllCustomer,
  addNewCustomer,
  EditCustomer,
} from '../../_stores/customer';
import {fontTitle, cosFont} from '../font';

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      isShowModal: false,
      condition: '',
      name: '',
      identityNumber: '',
      phoneNumber: '',
      images: '',
      isEditCustomer: false,
      placeholder_name: '',
      placeholder_IN: '',
      placeholder_PN: '',
      placeholder_Img: '',
      idEdit: null,
    };
  }

  // componentDidMount() {
  //   this.handleList();
  // }

  handleList = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.getAllCustomer();
    } catch (error) {
      console.log(error);
    }
  };

  handleData = datas => {
    return (
      <View>
        <FlatList
          data={datas}
          renderItem={({item}) =>
            this.showData(
              item.id,
              item.name,
              item.identity_number,
              item.phone,
              item.image,
            )
          }
          keyExtractor={item => item.id.toString()}
          onRefresh={() => this.handleList()}
          refreshing={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  editData = async () => {
    const {idEdit, name, identityNumber, phoneNumber, images} = this.state;
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.EditCustomer(
        idEdit,
        name,
        identityNumber,
        phoneNumber,
        images,
      );
      this.setState({isShowModal: false});
    } catch (error) {
      console.log(error);
    }
  };

  handleEditCustomer = (id, name, IN, PN, Img) => {
    this.setState({
      isEditCustomer: true,
      isShowModal: true,
      condition: 'Edit Customer',
      placeholder_name: name,
      placeholder_IN: IN,
      placeholder_PN: PN,
      placeholder_Img: Img,
      idEdit: id,
      name,
      identityNumber: IN,
      phoneNumber: PN,
      images: Img,
    });
    // console.log(edit);
  };

  showData = (id, name, identity_number, phone, image) => {
    // console.log(identity_number);
    return (
      <TouchableOpacity
        onPress={() =>
          this.handleEditCustomer(id, name, identity_number, phone, image)
        }>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            backgroundColor: 'rgba(240, 98, 193,0.5)',
            borderRadius: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 90, width: 100, borderRadius: 15}}
              source={{uri: image}}
            />
            <View style={{justifyContent: 'center', marginLeft: 25}}>
              <Text style={styles.text}>{name}</Text>
              <Text style={styles.text}>{identity_number}</Text>
              <Text style={styles.text}>{phone}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  addData = async () => {
    const {name, identityNumber, phoneNumber} = this.state;
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.addNewCustomer(name, identityNumber, phoneNumber);
      this.setState({isShowModal: false});
    } catch (error) {
      console.log(error);
    }
  };

  modalScreen = () => {
    const {
      condition,
      placeholder_name,
      placeholder_IN,
      placeholder_PN,
      placeholder_Img,
      isShowModal,
      isEditCustomer,
    } = this.state;
    return (
      <Modal
        isVisible={isShowModal}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.viewModal}>
          <Text style={[{marginBottom: 15, fontSize: 20, fontFamily: cosFont}]}>
            {condition}
          </Text>
          <Text style={styles.labelModal}>Name*</Text>
          <TextInput
            placeholder={placeholder_name}
            style={styles.inputModal}
            onChangeText={name => this.setState({name})}
          />
          <Text style={styles.labelModal}>Identity Number*</Text>
          <TextInput
            placeholder={placeholder_IN.toString()}
            style={styles.inputModal}
            onChangeText={identityNumber => this.setState({identityNumber})}
          />
          <Text style={styles.labelModal}>Phone Number*</Text>
          <TextInput
            placeholder={placeholder_PN.toString()}
            style={styles.inputModal}
            onChangeText={phoneNumber => this.setState({phoneNumber})}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Button
              title="Save"
              type="solid"
              titleStyle={styles.btn}
              buttonStyle={[
                styles.button,
                {marginRight: 15, backgroundColor: '#384cae'},
              ]}
              onPress={() => this.validationAction(isEditCustomer)}
            />
            <Button
              title="Cancel"
              type="solid"
              titleStyle={styles.btn}
              buttonStyle={[
                styles.button,
                {marginLeft: 15, backgroundColor: 'red'},
              ]}
              onPress={() =>
                this.setState({
                  isShowModal: false,
                })
              }
            />
          </View>
        </View>
      </Modal>
    );
  };

  validationAction = item => {
    const {name, identityNumber, phoneNumber, images} = this.state;
    if (name && identityNumber && phoneNumber) {
      item ? this.editData() : this.addData();
    } else {
      alert('Data cannot be empty !');
    }
  };

  setupAdd = () => {
    this.setState({
      isShowModal: true,
      isEditCustomer: false,
      condition: 'Add Customer',
      placeholder_name: '',
      placeholder_IN: '',
      placeholder_PN: '',
      placeholder_Img: '',
      name: '',
      identityNumber: '',
      phoneNumber: '',
      images: '',
    });
  };

  render() {
    const {customers} = this.props;
    // console.log(JSON.stringify(customers.data, null, 2));
    // console.log(this.state.isEditCustomer);
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../../../background/background.jpg')}>
          <Header
            androidStatusBarColor="rgb(240, 98, 193)"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(240, 98, 193)',
              height: 50,
            }}>
            <Title style={fontTitle}>Customers</Title>
          </Header>
          <View style={{flex: 1, marginBottom: 5}}>
            {this.handleData(customers.data)}
          </View>
          <Fab
            active={true}
            style={{backgroundColor: 'white'}}
            position="bottomRight"
            onPress={() => this.setupAdd()}>
            <Icon name="plus" style={{color: 'rgb(240, 98, 193)'}} />
          </Fab>
          {this.modalScreen()}
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = {
  getAllCustomer,
  addNewCustomer,
  EditCustomer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: 'rgb(39, 22, 66)',
    fontFamily: cosFont,
  },
  viewModal: {
    backgroundColor: 'rgb(242, 189, 255)',
    paddingHorizontal: 25,
    paddingVertical: 30,
    borderRadius: 15,
    width: 310,
  },
  labelModal: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: cosFont,
  },
  inputModal: {
    borderWidth: 1,
    height: 45,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: cosFont,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    height: 35,
    width: 100,
    borderRadius: 10,
  },
  btn: {
    fontFamily: cosFont,
    fontSize: 17,
  },
});
