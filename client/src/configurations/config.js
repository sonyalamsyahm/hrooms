import AsyncStorage from '@react-native-community/async-storage';

export const URL = 'http://192.168.1.28:5000/api/v2';

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem('user');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
