import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native'


import { AssMatTpl } from './AssMatTpl';


export class SearchResultsTpl extends React.Component {
    constructor(props){
        super(props)
        this._displayDetailsItem = this._displayDetailsItem.bind(this);
    }

    _displayDetailsItem = (assMatId, assMatThumbnail, assMatFirstName, assMatLastName, assMatStreet, assMatCity) => {
        //alert("Display item with id " + idDetailsItem)
        // pour récupérer les paramètres dans le component DetailsItem
        this.props.navigation.navigate("DetailsItem", {
            assMatId: assMatId,
            assMatThumbnail: assMatThumbnail,
            assMatFirstName: assMatFirstName,
            assMatLastName: assMatLastName,
            assMatStreet: assMatStreet,
            assMatCity: assMatCity
        })
    }

    _displayFavoriteImage() {
        if (this.props.isAssMatFavorite) {
            return (
            <Image
                style={[styles.favorite_image, width= 49.5, height = 43.5]}
                source={ require('../Assets/Images/favoriteYes.png') }
            />
        )
        }
    }
    render(){       
        const { assMatItem, _displayDetailsItem } = this.props
        return(
            <View style={{backgroundColor: '#CCDCED', marginBottom: 1, paddingTop:7 }} opacity={0.7}>          
            <FlatList 
            /* style={{padding:10, height: height * 0.8}} */
            //data = { this.state.assMatList }
            data = { this.props.results }
            //extraData = {this.props.favoritesAssMat}
            keyExtractor={(item) => item.id.toString()}
            renderItem = {({item}) =>
            <AssMatTpl
                assMatItem={item} 
                //navigation={this.props.navigation} 
                // Ajout d'une props isAssMatFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                /* isAssMatFavorite = {(this.props.favoritesAssMat.findIndex(assMatItem => 
                  assMatItem.id === item.id) !== -1) ? true : false} */       
                //_displayDetailsItem = {this._displayDetailsItem}    
            />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if(this.page < this.totalPages) { // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                //this._loadAssMatList();
              }
            }} 
              />
        </View>
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