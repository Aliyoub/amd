import React from 'react';
import {Text, Alert, TouchableOpacity, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase'
import User from '../User';
import style from '../Assets/Style/Style';


const styles = style.getLoginStyle();


export default class LoginScreen extends React.Component {
  static navigationOptions ={
    header:null
  }
  state = {
    phone: '',
    name: '',
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', 'stored value')
    } catch (e) {
      // saving error
    }
  }
  
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  handleChange = key => val => {
    this.setState({ [key]: val})
  }

  componentWillMount(){
    AsyncStorage.getItem('userPhone').then(val=>{
      if(val){
        this.setState({phone:val})
      }
    })
  }

  submitForm = async () => {
    if (this.state.phone.length < 10){
      Alert.alert('Error', 'Wrong Number')
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Wrong Name')
    } else{
// save user data
      // Alert.alert('Good')
        await AsyncStorage.setItem('userPhone', this.state.phone);
        User.phone = this.state.phone;
        firebase.database().ref('users/' + User.phone).set({name: this.state.name});
        this.props.navigation.navigate('App');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Phone Number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.setState.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput 
          placeholder="Name"
          style={styles.input}
          value={this.setState.phone}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}