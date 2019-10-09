import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { _getDataRef } from '../Firebase/FirebaseConfig'

class DetailsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assMatItem: undefined
      //isLoading: true
    }
  }

    componentDidMount() {
      _getDataRef('AssMatDispo/' + this.props.navigation.state.params.assMatKey).once('value').then(snapshot => {
        this.setState({
          assMatItem: {
            assMatKey: this.props.navigation.getParam('assMatKey'),
            assMatId: snapshot.val().id,
            assMatThumbnail: snapshot.val().picture.thumbnail,
            assMatMedium: snapshot.val().picture.medium,
            assMatLarge: snapshot.val().picture.large,
            assMatFirstName: snapshot.val().name.first,
            assMatLastName: snapshot.val().name.last,
            assMatStreet: snapshot.val().location.street,
            assMatCity: snapshot.val().location.city
            },
          //isLoading: false
        })
      })
      /* _getDataRef('AssMatDispo/' + this.props.navigation.state.params.assMatKey).then(data => {
        this.setState({
          assMatItem: data,
          isLoading: false
        })
      }) */

      /* return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
      }); */

     /* this.setState({
      assMatItem: {
        //this.props.navigation.state.params.assMatThumbnail (autre façon d'écrire)
        assMatKey: this.props.navigation.getParam('assMatKey'),
        assMatId: this.props.navigation.getParam('assMatId'),
        assMatThumbnail: this.props.navigation.getParam('assMatThumbnail'),
        assMatFirstName: this.props.navigation.getParam('assMatFirstName'),
        assMatLastName: this.props.navigation.getParam('assMatLastName'),
        assMatStreet: this.props.navigation.getParam('assMatStreet'),
        assMatCity: this.props.navigation.getParam('assMatCity')
      },
    }) */  
  }  

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.assMatItem }
    this.props.dispatch(action)
  }

  /* componentDidUpdate() {
    //alert(this.state.assMatItem.key)
  } */
  
  _displayFavoriteImage() {
    var sourceImage = require('../Assets/Images/favoriteNo.png')
    if (this.props.favoritesAssMat.findIndex((item) => 
    item.assMatKey === this.state.assMatItem.assMatKey) !== -1) {
      // dans nos favoris
      sourceImage = require('../Assets/Images/favoriteYes.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  render() {
    const { assMatItem } = this.state
   //alert(this.props.navigation.state.params.assMatKey)
   if (assMatItem != undefined) {
    //alert(assMatItem.assMatThumbnail)
      return (
        <View style={styles.scrollview_container}>
          <ScrollView>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Image style={styles.image} source={{uri: assMatItem.assMatLarge}}/>
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={() => this._toggleFavorite()}>
                {this._displayFavoriteImage() }
              </TouchableOpacity>
            </View>
          <Text style={styles.title_text}>
            {assMatItem.assMatFirstName.charAt(0).toUpperCase() + assMatItem.assMatFirstName.slice(1)}{' '}
            {assMatItem.assMatLastName.charAt(0).toUpperCase() + assMatItem.assMatLastName.slice(1)}
          </Text>   
          <Text>
            {assMatItem.assMatStreet.charAt(0).toUpperCase() + assMatItem.assMatStreet.slice(1)}
          </Text>
          <Text>
            {assMatItem.assMatCity.charAt(0).toUpperCase() + assMatItem.assMatCity.slice(1)}
          </Text>
          <Text style={styles.title_text}>Commentaire</Text>
          <Text>Aucun commentaire pour l'instant</Text>
          <Text style={styles.title_text}>Espace Accueil</Text>
          <Text>Aucune description pour l'instant</Text>
          </ScrollView>
        </View>
        
      )
    }else return null
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA'
  },
  image: {
    height: 169,
    width:169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  commentaire_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    width:50
  },
})

const mapStateToProps = (state) => {
  return {
    // favoritesAssMat est defini à la base dans favoriteReducer.js
    favoritesAssMat: state.favoritesAssMat
  }
}
export default connect(mapStateToProps)(DetailsItem)
//export default DetailsItem