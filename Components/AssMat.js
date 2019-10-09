import React, {Component} from 'react';
import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
import style from '../Assets/Style/Style';
import  {_getDataRef}  from '../Firebase/FirebaseConfig';
import { connect } from 'react-redux'
import { AssMatTpl } from './AssMatTpl';
//const styles = style.getMyItemStyle();


class AssMat extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      assMatList: [],
    }
  }

  _displayDetailsItem = (assMatKey) => {
    // pour récupérer les paramètres dans le component DetailsItem
    this.props.navigation.navigate("DetailsItem", {assMatKey: assMatKey})         
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
            data = { this.props.assMatList }
            extraData = {this.props.favoritesAssMat}
            keyExtractor = {(item) => item.assMatKey.toString()}
            renderItem = {({item}) =>
              <AssMatTpl
                assMatItem={item}
                // Ajout d'une props isAssMatFavorite pour indiquer à l'item d'afficher un 🖤 osu non
                isAssMatFavorite = {(this.props.favoritesAssMat.findIndex(assMatItem => 
                  assMatItem.assMatKey === item.assMatKey) !== -1) ? true : false
                  }                                        
                _displayDetailsItem = {this._displayDetailsItem}              
              />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              //alert('i++' + this.props.page)

              if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              //if (this.props.page < 39) {
                this.props._loadAssMatList();
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
    favoritesAssMat: state.favoritesAssMat
  }
}
export default connect(mapStateToProps)(AssMat)