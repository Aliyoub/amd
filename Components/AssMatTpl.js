import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

export class AssMatTpl extends React.Component{

    _displayFavoriteImage() {
        if (this.props.isAssMatFavorite) {
            return (
                <Image 
                    style={[styles.favorite_image]} 
                    source = { require('../Assets/Images/favoriteYes.png') }
                />
            )            
        }
    }
    render(){ 
        const { assMatItem, _displayDetailsItem} = this.props
        return(
        <View style={{backgroundColor: '#CCDCED', marginBottom: 1, paddingTop:7 }} opacity={0.5}>                    
            <TouchableOpacity style={styles.main_container} 
                onPress={() => _displayDetailsItem(
                    assMatItem.id,
                    assMatItem.picture.thumbnail,
                    assMatItem.name.first,
                    assMatItem.name.last, 
                    assMatItem.location.street, 
                    assMatItem.location.city)
                }>                       
                <View style={{justifyContent:'center', alignSelf:'flex-start', marginLeft:7}}>
                    <Image style={{width: 49.5, height: 43.5, borderRadius:50}} source = {{uri:assMatItem.picture.thumbnail}} />
                </View>
                <View style={styles.userInfosWithoutAvatar}>
                    <View style={{flex:1}}>
                        <Text style={styles.user_name}>
                            {this._displayFavoriteImage()}
                            {assMatItem.name.first} {assMatItem.name.last} {' '}
                        </Text>
                        <Text style={styles.user_address}>{assMatItem.location.street} - {assMatItem.location.city}</Text>
                        <View style={styles.blocAtTheBottomOfItem}>
                            <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12}}>Dispo: oui  </Text>
                            <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12}}>Place(s): 3  </Text>
                            <Text style={{color:'#AC1354',fontWeight: 'bold',fontSize: 12}}>Expérience: 5</Text>
                        </View>           
                    </View>
                </View>
            </TouchableOpacity>
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
    },
    favorite_image: {
        width:15,
        height:15
    }
})