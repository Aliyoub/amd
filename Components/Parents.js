import React, {Component} from 'react';
import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
import style from '../Assets/Style/Style';
import  {_getDataRef}  from '../Firebase/FirebaseConfig';
import { connect } from 'react-redux'
import { ParentsTpl } from './ParentsTpl';
//const styles = style.getMyItemStyle();


class Parents extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      parentsList: [],
    }
  }

  _displayParentsDetailsItem = (parentKey) => {
    // pour récupérer les paramètres dans le component ParentsDetailsItem
    this.props.navigation.navigate("ParentsDetailsItem", {parentKey: parentKey})         
  }
  render() {
    let pic = {
          uri: 'https://cdn.pixabay.com/photo/2013/02/21/19/10/mother-84628_960_720.jpg'
        };
    return (
      <View>
        <ImageBackground source={pic} style={{width: '100%', height: '100%'}}> 
          <FlatList 
            /* style={{padding:10, height: height * 0.8}} */
            data = { this.props.parentsList }
            extraData = {this.props.favoritesParents}
            keyExtractor = {(item) => item.parentKey.toString()}
            renderItem = {({item}) =>
              <ParentsTpl
                parentsItem={item}
                // Ajout d'une props isParentsFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                isParentsFavorite = {(this.props.favoritesParents.findIndex(parentsItem => 
                  parentsItem.parentKey === item.parentKey) !== -1) ? true : false
                  }                                        
                _displayParentsDetailsItem = {this._displayParentsDetailsItem}           
              />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              //alert('i++' + this.props.page)

              if (!this.props.ParentsFavoriteList && this.props.page < this.props.totalPages) {
              //if (this.props.page < 39) {
                this.props._loadParentsList();
                //alert(this.props.totalPages+'test')
              }
            }} 
          />
        </ImageBackground>
      </View>             
    )
  }
}

const mapStateToProps = state => {
  return {
    favoritesParents: state.favoritesParents
  }
}
export default connect(mapStateToProps)(Parents)