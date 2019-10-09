import React from 'react'
import { StyleSheet } from 'react-native'
import Parents from './Parents'
import { connect } from 'react-redux'

class ParentsFavorites extends React.Component {

  render() {
    return (
      <Parents
        parentsList={this.props.favoritesParents}
        navigation={this.props.navigation}
        // Ici (en dessous) on est bien dans le cas de la liste des 'ass mat' favoris. 
        //Ce booléen à true permettra d'empêcher de lancer la recherche de plus de 'ass mat' 
        //après un scroll lorsqu'on est sur la vue Favoris.
        //favoriteList={true} 
      />
    )
  }
}
const styles = StyleSheet.create({})

const mapStateToProps = state => {
  return {
    favoritesParents: state.favoritesParents
  }
}
export default connect(mapStateToProps)(ParentsFavorites)