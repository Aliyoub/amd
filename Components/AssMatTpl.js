import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        const randomOuiNonArray = Array('oui','non');
        const randomPlaceArray = Array(1,2,3,4);
        const randomExperienceArray = Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);

        const randomOuiNon = randomOuiNonArray[Math.floor(Math.random() * randomOuiNonArray.length)];
        const randomPlace = randomPlaceArray[Math.floor(Math.random() * randomPlaceArray.length)];
        const randomExperience = randomExperienceArray[Math.floor(Math.random() * randomExperienceArray.length)];

		const { assMatItem, _displayDetailsItem} = this.props
		return(
		<View style={styles.main_container} opacity={0.7}>                    
			<TouchableOpacity style={styles.subMain_container} 
				onPress={() => _displayDetailsItem(assMatItem.assMatKey)					
				}>                       
				<View style={styles.userThumnailContainer}>
					<Image style={styles.userThumnail} source = {{uri:assMatItem.assMatThumbnail}} />
				</View>
					<View style={styles.userInfosWithoutAvatar}>
						<View style={{flex:1}}>
							<Text style={styles.user_name}>
                                {this._displayFavoriteImage()}
                            {/* <Icon name="favorite" color='#DA2C82' size={17} 
                                style={{marginLeft:30}}                         
                            /> */}{' '}
								{assMatItem.assMatLastName.charAt(0).toUpperCase() + assMatItem.assMatLastName.slice(1)} {' '}
                                {assMatItem.assMatFirstName.charAt(0).toUpperCase() + assMatItem.assMatFirstName.slice(1)} {' '}
							</Text>
							<Text style={styles.user_address}>
                            {/* assMatItem.assMatStreet.charAt(0).toUpperCase() + assMatItem.assMatStreet.slice(1) */} {/* - */} 
                            {assMatItem.assMatCity.charAt(0).toUpperCase() + assMatItem.assMatCity.slice(1)}</Text>
							<View style={styles.blocAtTheBottomOfItem}>
								<Text style={{color:'#DA2C82',fontWeight: 'bold',fontSize: 12}}>Dispo: {randomOuiNon}  </Text>
								<Text style={{color:'#DA2C82',fontWeight: 'bold',fontSize: 12}}>Place(s): {randomPlace}  </Text>
								<Text style={{color:'#DA2C82',fontWeight: 'bold',fontSize: 12}}>Expérience: {randomExperience}</Text>
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
        backgroundColor: '#CCDCED', marginBottom: 1, paddingTop:7 
    },
    subMain_container: {
        width: '100%',
        color: 'red',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    blocAtTheBottomOfItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:15,
        marginRight:15
    },
    userThumnailContainer:{
        justifyContent:'center', 
        alignSelf:'flex-start', 
        marginLeft:7
    },
    userThumnail:{
        width: 49.5, 
        height: 43.5, 
        borderRadius:50
    },
    userInfosWithoutAvatar: {
        flexDirection: 'column',
        flex: 1,
        /* alignItems: 'center' */
    },


    user_name: {
        marginLeft: 15,
        color: '#DA2C82',
        //color: '#C50707',
        fontWeight: 'bold',
        fontSize: 14,

    },
    user_address: {
        marginLeft: 15,
        color: '#DA2C82',
        //color: '#C50707',
        fontWeight: 'bold',
        fontSize: 12
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
    favorite_image: {
        width:15,
        height:15
    }
})