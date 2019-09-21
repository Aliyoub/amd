import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { _getDataRef } from '../Firebase/FirebaseConfig'

class DetailsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assMatItem: []
      //isLoading: true
    }

    /* this.setState({
      assMatItem: {
        //this.props.navigation.state.params.assMatThumbnail (autre façon d'écrire)
        key: props.navigation.getParam('key'),
        assMatId: props.navigation.getParam('assMatId'),
        assMatThumbnail: props.navigation.getParam('assMatThumbnail'),
        assMatFirstName: props.navigation.getParam('assMatFirstName'),
        assMatLastName: props.navigation.getParam('assMatLastName'),
        assMatStreet: props.navigation.getParam('assMatStreet'),
        assMatCity: props.navigation.getParam('assMatCity')
      },
    }) */
  }

   componentDidMount() {
   /* _getDataRef(this.props.navigation.state.params.idDetailsItem).then(data => {
      this.setState({
        assMatItem: data,
        isLoading: false
      })
      alert(assMatItem.email)
    })*/

    /* return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    }); */
    //alert(this.props.navigation.state.params.idDetailsItem)
  this.setState({
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
  })
    
  } 

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.assMatItem }
    this.props.dispatch(action)
  }

  componentDidUpdate() {
    //alert(this.state.assMatItem.key)
  }
  
  _displayFavoriteImage() {
    var sourceImage = require('../Assets/Images/favoriteNo.png')
    if (this.props.favoritesAssMat.findIndex(item => item.assMatKey === this.state.assMatItem.assMatKey) !== -1) {
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
    if (assMatItem != undefined) {
      //alert(assMatItem.assMatKey)
      return (
        <View style={styles.scrollview_container}>
          <ScrollView>
            <Image
              style={styles.image}
              source={{uri: this.state.assMatItem.assMatThumbnail}}
            />
          <Text style={styles.title_text}>{this.state.assMatItem.assMatFirstName} {this.state.assMatItem.assMatLastName}</Text>   
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text>{this.state.assMatItem.assMatStreet}</Text>
          <Text>{this.state.assMatItem.assMatcity}</Text>
          <Text style={styles.title_text}>Commentaire</Text>
          <Text>Aucun commentaire pour l'instant</Text>
          <Text style={styles.title_text}>Espace Accueil</Text>
          <Text>Aucune description pour l'instant</Text>
          </ScrollView>
        </View>
        
      )
    }
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
    //height: 169,
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