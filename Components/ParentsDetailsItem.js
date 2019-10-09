import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { _getDataRef } from '../Firebase/FirebaseConfig'

class ParentsDetailsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parentsItem: undefined
      //isLoading: true
    }
  }

    componentDidMount() {
      _getDataRef('Parents/' + this.props.navigation.state.params.parentKey).once('value').then(snapshot => {
        this.setState({
          parentsItem: {
            parentKey: this.props.navigation.getParam('parentKey'),
            parentId: snapshot.val().id,
            parentThumbnail: snapshot.val().picture.thumbnail,
            parentMedium: snapshot.val().picture.medium,
            parentLarge: snapshot.val().picture.large,
            parentFirstName: snapshot.val().name.first,
            parentLastName: snapshot.val().name.last,
            parentStreet: snapshot.val().location.street,
            parentCity: snapshot.val().location.city
            },
          //isLoading: false
        })
      })       
  }  

  _toggleParentsFavorite() {
    const action = { type: "TOGGLE_PARENTS_FAVORITE", value: this.state.parentsItem }
    this.props.dispatch(action)
  }

  
  _displayFavoriteImage() {
    var sourceImage = require('../Assets/Images/favoriteNo.png')
    if (this.props.favoritesParents.findIndex((item) => 
    item.parentKey === this.state.parentsItem.parentKey) !== -1) {
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
    const { parentsItem } = this.state
   //alert(this.props.navigation.state.params.parentKey)
   if (parentsItem != undefined) {
    //alert(parentsItem.picture.thumbnail)
      return (
        <View style={styles.scrollview_container}>
          <ScrollView>
          <Image
            style={styles.image}
            source={{uri: parentsItem.parentLarge}}
          />
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleParentsFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.title_text}>
            {parentsItem.parentFirstName.charAt(0).toUpperCase() + parentsItem.parentFirstName.slice(1)}{' '}
            { parentsItem.parentLastName.charAt(0).toUpperCase() + parentsItem.parentLastName.slice(1) }
          </Text>   

          <Text>
            {parentsItem.parentStreet.charAt(0).toUpperCase() + parentsItem.parentStreet.slice(1)}
          </Text>
          <Text>
            {parentsItem.parentCity.charAt(0).toUpperCase() + parentsItem.parentCity.slice(1)}
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
    height: '70%',
    width: '70%',
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
    // favoritesParents est defini à la base dans ParentsFavoriteReducer.js
    favoritesParents: state.favoritesParents
  }
}
export default connect(mapStateToProps)(ParentsDetailsItem)