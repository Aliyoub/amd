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

    this.page = 0
    this.totalPages = 0
 
    this.state = {
      assMatList: [],
      isLoading: false,
    }
    this._loadAssMatList = this._loadAssMatList.bind(this);
    this._displayDetailsItem = this._displayDetailsItem.bind(this);
  }

  _loadAssMatList() {
    _getDataRef('AssMatDispo').on('value', (childSnapshot) => {
      const assMatList = [];
      childSnapshot.forEach((doc) => {
        assMatList.push({
          assMatKey: doc.key,
          assMatId: doc.toJSON().id.value,
          assMatThumbnail: doc.toJSON().picture.thumbnail,
          assMatFirstName: doc.toJSON().name.first,
          assMatLastName: doc.toJSON().name.last,
          assMatStreet: doc.toJSON().location.street,
          assMatcity: doc.toJSON().location.city,
        });
        this.setState({
          assMatList: assMatList,
          loading: false,
        });
      });
    });
  }

  _displayDetailsItem = (assMatKey) => {
    // pour récupérer les paramètres dans le component DetailsItem
    this.props.navigation.navigate("DetailsItem", {assMatKey: assMatKey})         
  }

  componentDidMount() {
    this._loadAssMatList();
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
            data = { this.state.assMatList }
            extraData = {this.props.favoritesAssMat}
            keyExtractor = {(item) => item.assMatKey.toString()}
            renderItem = {({item}) =>
              <AssMatTpl
                assMatItem={item}
                // Ajout d'une props isAssMatFavorite pour indiquer à l'item d'afficher un 🖤 osu non
                isAssMatFavorite = {(this.props.favoritesAssMat.findIndex(assMatItem => 
                  assMatItem.assMatKey === item.assMatKey) !== -1) ? true : false
                  }
                 // assMatItem.id === item.id) !== -1) ? true : false}                                         
                _displayDetailsItem = {this._displayDetailsItem}              
              />
            }
            /* onEndReachedThreshold={0.5}
            onEndReached={() => {
              if(this.page < this.totalPages) { // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                //this._loadAssMatList();
              }
            }} */ 
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