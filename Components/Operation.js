import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default class Operation extends React.Component {

  render() {
    return (
      <AssMat
        //films={this.props.favoritesFilm}
        assMatList={this.props.favoritesAssMat}
        navigation={this.props.navigation}
        // Ici (en dessous) on est bien dans le cas de la liste des 'ass mat' favoris. 
        //Ce booléen à true permettra d'empêcher de lancer la recherche de plus de 'ass mat' 
        //après un scroll lorsqu'on est sur la vue Favoris.
        favoriteList={true} 
      />
    )
  }
}
const styles = StyleSheet.create({})