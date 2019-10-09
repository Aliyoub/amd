import { createStackNavigator, createAppContainer  } from 'react-navigation'

import Home from '../Components/Home'
import DetailsItem from '../Components/DetailsItem'
import ParentsDetailsItem from '../Components/ParentsDetailsItem'
import Favorites from '../Components/Favorites'
import ParentsFavorites from '../Components/ParentsFavorites'
import Messages from '../Components/Messages'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Home,
        navigationOptions: {
            headerStyle: {
                //Pour cacher la barre de navigation qd on est sur Home, 
                //et ne laisser que les tabs (onglets de navigation) ... screen: Home
                height: 0
            }
        }
    },
    DetailsItem: {
        screen: DetailsItem,
        navigationOptions: {
            title: 'Détails Ass Mat',
        }
    },
    ParentsDetailsItem: {
        screen: ParentsDetailsItem,
        navigationOptions: {
            title: 'Détails Parents',
        }
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'MES FAVORIS ASS MAT',
        }
    },
    ParentsFavorites: {
        screen: ParentsFavorites,
        navigationOptions: {
            title: 'MES FAVORIS PARENTS',
        }
    },
})

/* const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'MES FAVORIS',
        }
    },
    DetailsItem: {
        screen: DetailsItem,
        navigationOptions: {
            title: 'Details',
        }
    },
}) */

/* const AssMatTabNavigator = createStackNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
             tabBarIcon: () => {
                return <Image
                source={require('../Images/ic_search.png')}
                style={styles.icon}/>
            } 
            }
        },

        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
             tabBarIcon: () => {
                return <Image
                source={require('../Images/ic_favorite.png')}
                style={styles.icon}/>
            } 
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true
        }
    }
) */

export default createAppContainer(SearchStackNavigator)