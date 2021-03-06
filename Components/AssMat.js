import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, Image, ImageBackground,TouchableOpacity} from 'react-native';
import { ASSMAT_DATA } from '../Data/data';
import style from '../Style/Style';
//import firebase from 'firebase';
import { _getDataRef } from '../Firebase/FirebaseConfig'
//const styles = style.getMyItemStyle();
 
/* const firebaseConfig = {
  apiKey: FirebaseConfig.apiKey,
  authDomain: FirebaseConfig.authDomain,
  databaseURL: FirebaseConfig.databaseURL,
  projectId: FirebaseConfig.projectId,
  storageBucket: FirebaseConfig.storageBucket,
  messagingSenderId: FirebaseConfig.messagingSenderId,
  appId: FirebaseConfig.appId
}

firebase.initializeApp(firebaseConfig); */
//const rootRef = firebase.database().ref();
//const assMatDispoRef = rootRef.child('AssMatDispo');
//const assMatDispoRef = firebase.database().ref('AssMatDispo');

_getDataRef('AssMatDispo');

export default class AssMat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,

      person: {
          /* name: props.navigation.getParam('name'),
          phone: props.navigation.getParam('phone'), */
        },
        textMessage: '',
        assMatDispoList: []
    }
  }

  _displayDetailsItem = (idDetailsItem) => {
    //alert("Display item with id " + idDetailsItem)
    // pour le récupérer le paramètre idDetailsItem DetailsItem
    this.props.navigation.navigate("DetailsItem", { idDetailsItem: idDetailsItem })
  }

  componentDidMount() {
  //componentWillMount() {

    //assMatDispoRef.on('value', (childSnapshot) => {
    _getDataRef('AssMatDispo').on('value', (childSnapshot) => {
      const assMatDispoList = [];
      childSnapshot.forEach((doc) => {
        assMatDispoList.push({
          key: doc.key,
          assMatid: doc.toJSON().id.value,
          assMatThumbnail: doc.toJSON().picture.thumbnail,
          assMatFirstName: doc.toJSON().name.first,
          assMatLastName: doc.toJSON().name.last,
          assMatStreet: doc.toJSON().location.street,
          assMatcity: doc.toJSON().location.city,
        });
        this.setState({
          assMatDispoList: assMatDispoList.sort((a, b) => {
            return (a.assMatUserFirstName);
            //return (a.assMatUserFirstName < b.assMatUserFirstName);
          }),
          loading: false,
        });
      });
    });
  }

  renderRow = ({item}) => {
    //const { displayDetailsItem } = this.props

    return(
      <View style={{backgroundColor: '#CCDCED', marginBottom: 1, paddingTop:7 }} opacity={0.7}>                    
        <TouchableOpacity style={styles.main_container} 
            //onPress={() => this._displayDetailsItem(item.assMatid)}>                    
            onPress={() => this._displayDetailsItem(item.key)}>                    
          <View style={{justifyContent:'center', alignSelf:'flex-start', marginLeft:7}}>
              <Image style={{width: 49.5, height: 43.5, borderRadius:50}} source = {{uri:item.assMatThumbnail}} />
          </View>
          <View style={styles.userInfosWithoutAvatar}>
            <View style={{flex:1}}>
                <Text style={styles.user_name}>{item.assMatFirstName} {item.assMatLastName}</Text>
                <Text style={styles.user_address}>{item.assMatStreet} - {item.assMatCity}</Text>
                <View style={styles.blocAtTheBottomOfItem}>
                    <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12}}>Dispo: oui</Text>
                    <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12}}>Place(s): 3</Text>
                    <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12}}>Expérience: 5 ans</Text>
                </View>           
            </View>
          </View>
        </TouchableOpacity>
          {/* <View style={{flex:1, alignItems:'flex-end', paddingBottom:'2%'}}>
            <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12, marginRight:'2%',textDecorationLine: 'underline'}}
            onPress={() => alert(user.id.value)}>Voir
            </Text>
          </View> */}
      </View>
    )
  }

  /* componentDidMount() {
      this.setState({
         // loaded: true
      })
    } */
  
  render() {
    let pic = {
          uri: 'https://cdn.pixabay.com/photo/2013/02/21/19/10/mother-84628_960_720.jpg'
        };
    return (
      <View>
        <ImageBackground source={pic} style={{width: '100%', height: '100%'}}> 
          <FlatList 
            /* style={{padding:10, height: height * 0.8}} */
            data = { this.state.assMatDispoList }
            //keyExtractor = {(item) => item.id.value.toString()}
            //onEndReachedThreshold = {0.5}
            renderItem = { this.renderRow }
          />
        </ImageBackground>
      </View>
      
        
    )
  }

  _renderPersonRow(person) {
    return (
      /* <TouchableOpacity onPress={() => {this.props.navigator.push({id:'chatbox', image:person.image, name:person.first_name}) }}> */
       <TouchableOpacity onPress={() => {this.props.navigator.push({id:'Parents'}) }}>
        <View style = {styles.listItemContainer}><Text>ok!!!!</Text>
          {/* <View style= {styles.iconContainer}>
            <Image source={{uri:person.image}} style={styles.initStyle} resizeMode='contain' />
          </View> */}
          {/* <View style = {styles.callerDetailsContainer}>
            <View style={styles.callerDetailsContainerWrap}>
              <View style={styles.nameContainer}>
                <Text style={{fontWeight: 'bold'}}>{person.first_name}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{fontSize: 11}}>{person.time}</Text>
              </View>
            </View> */}
            {/* <View style={styles.messageContainer}>
              <Icon name="done-all" color={person.read ? '#075e54' : '#777'} size={15} style={{ padding:0 }} />
              <Text numberOfLines={1} style={{flex: 1, fontSize: 12, color: '#777' }}>{person.message}</Text>
            </View> */}
          {/* </View> */}
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    color: 'red',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  blocAtTheBottomOfItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfosWithoutAvatar: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },


  user_name: {
    marginLeft: 15,
    color: '#AC1354',
    //color: '#C50707',
    fontWeight: 'bold',
    fontSize: 14

  },
  user_address: {
    marginLeft: 15,
    color: '#AC1354',
    //color: '#C50707',
    fontWeight: 'bold',
    fontSize: 14
  },
  user_dispo: {
    marginLeft: 15,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: '#FF99DC',
    padding: 3,
    borderRadius: 100
  },
  user_places: {
    marginLeft: 15,
    color: '#B86547',
    fontWeight: 'bold',
    fontSize: 14
  },
  user_agrement: {
    marginLeft: 15,
    color: '#B86547',
    fontWeight: 'bold',
    fontSize: 14
  },
  myVoirPlusButton: {
    fontSize: 10
  }
})