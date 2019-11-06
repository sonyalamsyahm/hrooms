import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Header, Title, Input, Item, Picker} from 'native-base';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';

import {setHeaderAuth} from '../../configurations/api';
import {getData} from '../../configurations/config';
import {
  fetchDataCheckin,
  fetchAddCheckin,
  fetchCheckout,
} from '../../_stores/checkin';
// import {getAllCustomer} from '../../_stores/customer';
// import {fetchDataUser} from '../../_stores/setting';
import {getTimeDiffMin, getTimeDiffSec} from '../../configurations/timer';
import {fontTitle, cosFont} from '../font';

const reset = {
  modal: false,
  roomId: null,
  roomName: '',
  customerId: null,
  customerName: '',
  placeholder_duration: 0,
  nameAction: '',
  duration: 0,
  orderId: null,
};

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      roomId: null,
      roomName: '',
      customerId: null,
      customerName: '',
      placeholder_duration: 0,
      nameAction: '',
      duration: 0,
      orderId: null,
    };
  }

  componentDidMount = () => {
    this.handleGetData();
  };

  handleGetData = async () => {
    try {
      const data = await getData();
      const id = data.id;
      setHeaderAuth(data.token);
      this.props.fetchDataCheckin(id);
    } catch (error) {
      console.log(error);
    }
  };

  showTimer = room => {
    const {order} = room;
    const isCheckout = order && order.is_booked ? true : false;

    if (isCheckout) {
      const date = new Date(order.order_end_time);
      const duration = getTimeDiffSec(date);

      return (
        <View>
          <CountDown
            until={duration}
            size={12}
            onFinish={() => this.checkout(order.id)}
            digitStyle={{
              backgroundColor: 'white',
            }}
            digitTxtStyle={{
              color: 'black',
            }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: null, m: null, s: null}}
          />
        </View>
      );
    }
    return;
  };

  // handleGetUser = async () => {
  //   try {
  //     const data = await getData();
  //     setHeaderAuth(data.token);
  //     const id = data.id;

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  handlePress = item => {
    const {customers} = this.props;
    this.setState({
      nameAction: item.order && item.order.is_booked ? 'Checkout' : 'Checkin',
      modal: true,
      roomId: item.id,
      roomName: item.name,
      customerName: item.customer ? item.customer.name : '',
      customerId: item.customer
        ? item.customer.id
        : customers.data.length > 0
        ? customers.data[0].id
        : null,
      placeholder_duration: item.order
        ? getTimeDiffMin(new Date(item.order.order_end_time))
        : 0,
      duration: item.order ? item.order.duration : 0,
      orderId: item.order ? item.order.id : null,
    });
  };

  handleRenderData = item => {
    const roomStyle = [
      styles.roomCont,
      item.order && item.order.is_booked
        ? styles.roomUnavailable
        : styles.roomAvailable,
    ];
    return (
      <TouchableOpacity onPress={() => this.handlePress(item)}>
        <View style={roomStyle}>
          <Text style={styles.text}>{item.name}</Text>
          {this.showTimer(item)}
        </View>
      </TouchableOpacity>
    );
  };

  renderData = data => {
    return (
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => this.handleRenderData(item)}
        keyExtractor={Item => Item.id.toString()}
        onRefresh={() => this.handleGetData()}
        refreshing={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  handleModalCheckin = item => {
    const {customers} = this.props;
    const {roomName, customerId, nameAction, placeholder_duration} = this.state;
    const labelDuration =
      nameAction === 'Checkout'
        ? 'Duration Left (minutes)'
        : 'Duration (minutes)';
    const isDisable = nameAction === 'Checkout' ? true : false;
    return (
      <Modal
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        isVisible={this.state.modal}>
        <View
          style={{
            backgroundColor: 'rgb(242, 189, 255)',
            paddingHorizontal: 25,
            paddingVertical: 30,
            borderRadius: 10,
            width: 310,
          }}>
          <Text style={{fontSize: 22, marginBottom: 12, fontFamily: cosFont}}>
            {nameAction}
          </Text>
          <Text style={styles.textForm}>Room name</Text>
          <Item regular style={{marginBottom: 10}}>
            <Input
              style={[{height: 45}, styles.input]}
              value={roomName}
              disabled
            />
          </Item>
          <Text style={styles.textForm}>Customer</Text>
          <Item picker style={[{marginBottom: 15}, styles.input]}>
            <Picker
              enabled={!isDisable}
              mode="dropdown"
              selectedValue={customerId}
              onValueChange={itemValue => {
                this.setState({customerId: itemValue});
              }}>
              {customers.data.map(customer => {
                return (
                  <Picker.Item
                    key={customer.id.toString()}
                    label={customer.name}
                    value={customer.id}
                  />
                );
              })}
            </Picker>
          </Item>
          <Text style={{fontSize: 17, marginBottom: 5, fontFamily: cosFont}}>
            {labelDuration}
          </Text>
          <Item regular style={{marginBottom: 10}}>
            <Input
              disabled={isDisable}
              style={[styles.input, {height: 45}]}
              placeholder={placeholder_duration.toString()}
              onChangeText={minutes => this.setState({duration: minutes})}
            />
          </Item>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button
              buttonStyle={[
                {marginRight: 15, backgroundColor: 'red'},
                styles.button,
              ]}
              title="Cancel"
              titleStyle={styles.btn}
              onPress={() => this.setState({modal: false})}
            />
            <Button
              buttonStyle={[
                {marginLeft: 15, backgroundColor: '#384cae'},
                styles.button,
              ]}
              title={nameAction}
              titleStyle={styles.btn}
              onPress={() => this.validationAction()}
            />
          </View>
        </View>
      </Modal>
    );
  };

  validationAction = () => {
    const {nameAction} = this.state;
    if (nameAction === 'Checkin') {
      this.validationCheckin();
    } else if (nameAction === 'Checkout') {
      this.validationCheckout();
    } else {
      alert('Something wrong!');
    }
  };

  validationCheckout = () => {
    const {orderId} = this.state;
    this.checkout(orderId);
  };

  checkout = async id => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchCheckout(id);
      this.setState(reset);
    } catch (error) {
      console.log(error);
    }
  };

  validationCheckin = () => {
    const {customerId, duration} = this.state;
    if (customerId && duration) {
      this.addCheckin();
    } else {
      alert('Data cannot be empty or null!');
    }
  };

  addCheckin = async () => {
    try {
      const {roomId, customerId, duration} = this.state;
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchAddCheckin(roomId, customerId, duration);
      this.setState(reset);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {checkins} = this.props;

    if (checkins.isLoading) {
      return <Text>LOADING BOSS</Text>;
    }

    return (
      <View style={styles.container}>
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
            <Title style={fontTitle}>Checkin</Title>
          </Header>
          <View style={[styles.headView, {justifyContent: 'center'}]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={[
                  styles.square,
                  {backgroundColor: 'rgb(240, 98, 193)'},
                ]}></View>
              <Text style={[styles.textHead, {marginRight: 30}]}>
                Available
              </Text>
              <View style={[styles.square, {backgroundColor: 'silver'}]}></View>
              <Text style={[styles.textHead]}>Not Available</Text>
            </View>
          </View>
          <View style={styles.mainView}>{this.renderData(checkins.data)}</View>
          <View>
            {checkins.data.length > 0
              ? this.handleModalCheckin(checkins.data)
              : null}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  checkins: state.checkins,
  customers: state.customers,
});

const mapDispatchToProps = {
  fetchDataCheckin,
  // getAllCustomer,
  // fetchDataUser,
  fetchAddCheckin,
  fetchCheckout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headView: {
    flex: 1,
    marginTop: 10,
  },
  mainView: {
    flex: 10,
    // width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  square: {
    height: 20,
    width: 20,
    borderRadius: 5,
  },
  textHead: {
    marginLeft: 10,
    fontSize: 17,
    fontFamily: cosFont,
  },
  roomCont: {
    width: Dimensions.get('window').width / 3.5,
    height: 150,
    margin: 7,
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10,
  },
  roomAvailable: {
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 98, 193, 1)',
  },
  roomUnavailable: {
    justifyContent: 'space-around',
    backgroundColor: 'silver',
  },
  button: {
    height: 35,
    width: 100,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    fontFamily: cosFont,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: cosFont,
  },
  textForm: {
    fontSize: 17,
    marginBottom: 5,
    fontFamily: cosFont,
  },
  btn: {
    fontFamily: cosFont,
    fontSize: 17,
  },
});
