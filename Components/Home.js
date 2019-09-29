import React, {Fragment} from 'react'
import {StyleSheet, View, StatusBar, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from 'react-native-searchbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

import  {_getDataRef}  from '../Firebase/FirebaseConfig';
import AssMat from './AssMat'
import Favorites from './Favorites'
import Operation from './Operation'
import Parents from './Parents'
import Messages from './Messages'
//import { Test } from './Test';
//import { SearchResultsTpl } from './SearchResultsTpl';
/* 
const iconsSet = {
    favoriteIcon: require('../Assets/Images/favoriteYes.png'),
};
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            //selected: 0,
            results: [],
            assMatList: [],
            totalPages:undefined,
            tab: 0,
        }
        this._handleResults = this._handleResults.bind(this);
        this._hideSearchBar = this._hideSearchBar.bind(this);
        this._loadAssMatList = this._loadAssMatList.bind(this);
        //this._displayDetailsItem = this._displayDetailsItem.bind(this);
    }

    _handleResults(results) {
    this.setState({ results });
    }

    _showSearchBar() {
    this.setState({searchBarExist: true});
    this.searchBar.show();
    }

    _hideSearchBar() {
    this.setState({searchBarExist: false});
    this.searchBar.hide();
    }

    _renderHeader() {
    if(!this.state.searchBarExist) {
        return (
        <View style={styles.HeaderContainer} style={{backgroundColor:'#FCA4F0', flexDirection:'row'}}>
            <View style={styles.leftHeaderContainer} style={{justifyContent:'center', flex:1 }}>
                <Text style={styles.logoText}>AssMatDispo</Text>
            </View>
            <View style={styles.rightHeaderContainer} style={{backgroundColor:'#FCA4F0', alignItems:'flex-end'}}>
                < TouchableOpacity onPress = {
                    () => this.props.navigation.navigate('Favorites')
                } >
                    <Icon name="favorite" color='#F660AA' size={23} 
                        style={{padding:5, marginRight:10}}                         
                    />                        
                </TouchableOpacity>
            </View>
            <View style={styles.rightHeaderContainer} style={{backgroundColor:'#FCA4F0', alignItems:'flex-end'}}>
                < TouchableOpacity onPress = {
                    () => this.props.navigation.navigate('Favorites')
                } >
                    <Icon name="mail" color='#F660AA' size={23} 
                        style={{padding:5, marginRight:10}}                         
                    />                        
                </TouchableOpacity>
            </View>
            <View style={styles.rightHeaderContainer} style={{backgroundColor:'#FCA4F0', alignItems:'flex-end'}}>
                <TouchableOpacity onPress={() => this._showSearchBar()}>
                    <Icon name="search" color='#fff' size={23} 
                        style={{padding:5, marginRight:10}}                         
                    />                        
                </TouchableOpacity>
            </View>
        </View>
        )
    } 
    else {return(<View style={{padding: 0, marginBottom:60}}></View>)}    
    }

  _loadAssMatList() {
      
    // totalPages : Nombre total d'éléments dans AssMatDispo  
    totalPages  = _getDataRef('AssMatDispo').once("value", function (snap) {
          alert(snap.numChildren());
      });

     //limitToFirst(10) Pour ne récupérer que 10 éléments à chaque chargement
    _getDataRef('AssMatDispo').limitToFirst(5).on('value', (childSnapshot) => {
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
        });
        this.setState({
            assMatList: assMatList,
            totalPages: childSnapshot.numChildren(),
            loading: false,
        });
    });
  }
                
    componentDidMount() {
    this._loadAssMatList();
    //alert(this.state.totalPages)
    }

    _displayDetailsItem = (assMatKey) => {
        //alert("Display item with id " + idDetailsItem)
        // pour récupérer les paramètres dans le component DetailsItem
        this.props.navigation.navigate("DetailsItem", {assMatKey: assMatKey})
    }
    
    
    render(){
        if (!this.state.searchBarExist){
            return (
            <Fragment>
                <StatusBar backgroundColor = '#F660AA' barStyle="dark-content" />                 
                {this._renderHeader()}
                <ScrollableTabView 
                    //initialPage={0}
                    tabBarUnderlineStyle = {{backgroundColor: "#fff", height:2.5}} 
                    tabBarBackgroundColor = "#FCA4F0" 
                    tabBarActiveTextColor = "#fff" 
                    tabBarInactiveTextColor = "#F660AA" 
                    //onChangeTab={(index) => this.handleChangeTab(index)}
                    onChangeTab={({i}) => this.setState({tab : i}) }
                >
                    {/* <Home tabLabel="HOME" /> */}
                    <AssMat tabLabel = "ASS MAT" 
                        assMatList =  {this.state.assMatList}  
                        _loadAssMatList = {this._loadAssMatList}
                        {...this.props}
                    />
                    <Parents tabLabel = "PARENTS" {...this.props} />
                    <Operation tabLabel = "COMMENT?" {...this.props} />
                </ScrollableTabView>
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    //data={items}
                    data = {this.state.assMatList}
                    handleResults = {this._handleResults}
                    placeholder = "Recherche..."
                    iconColor = "#F660AA"
                    //showOnLoad
                    onBack = {this._hideSearchBar}
                />  
            </Fragment>              
            )
        } 
     else{
      //let pic = {uri: 'https://cdn.pixabay.com/photo/2013/02/21/19/10/mother-84628_960_720.jpg'};                   
        return (
            <Fragment>
                <StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />                 
                {this._renderHeader()}
                <AssMat
                   assMatList = {this.state.results}                                         
                   navigation = {this.props.navigation}
                   _loadAssMatList = {this._loadAssMatList}
                />
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    //data={items}
                    data={this.state.assMatList} 
                    //allDataOnEmptySearch 
                    handleResults={this._handleResults} 
                    placeholder = "Recherche..." 
                    iconColor = "#F660AA" 
                    //showOnLoad
                    onBack = {this._hideSearchBar} 
                    //allDataOnEmptySearch = {true}
                    {
                        ...this.searchBar.getValue() === undefined ? 
                        (allDataOnEmptySearch = true) : 
                        (allDataOnEmptySearch = false)
                    }
                />   
            </Fragment>              
            )
        }
    }
    
    /* handleChangeTab(index) {
        this.setState({ selected: index.i });
    } */   
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height: 24
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#075e54",
        alignItems: "center",
        paddingRight: 5,
        backgroundColor: '#F8F9FA',
    },
    leftHeaderContainer: {
        alignItems: "flex-start",
        flexDirection: "row",
        backgroundColor: '#F8F9FA',
        height:20
    },
    rightHeaderContainer: {
        alignItems: "flex-end",
        flexDirection: "row",
        backgroundColor: '#F8F9FA',
        height:20
    },
    contentContainer: {
        flex: 6,
    },
    logoText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "flex-start",
        marginLeft: 10
    },
});
