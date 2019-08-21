import { createStackNavigator, createAppContainer  } from 'react-navigation'

import Home from '../Components/Home'
import DetailsItem from '../Components/DetailsItem'

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
            title: 'Details',
        }
    },

})

export default createAppContainer(SearchStackNavigator)