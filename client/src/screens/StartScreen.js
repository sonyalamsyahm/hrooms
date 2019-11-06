import React, {Component} from 'react';
import {Dimensions, View, ImageBackground, StyleSheet} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../configurations/config';

export default class StartScreen extends Component {
  componentDidMount = async () => {
    // console.log(this.props.navigation);
    const {navigate} = this.props.navigation;
    const data = await getData();
    data ? navigate('Private') : navigate('Public');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageStyle}
          source={{
            uri:
              'https://img.pngio.com/welcome-signs-welcome-clipart-indicator-welcome-png-transparent-welcome-sign-png-650_651.png',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(245,245,245)',
  },
});
