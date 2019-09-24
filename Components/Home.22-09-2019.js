import React, {Fragment} from 'react'
import {StyleSheet, View, StatusBar, Text, TouchableOpacity, FlatList, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from 'react-native-searchbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

import  {_getDataRef}  from '../Firebase/FirebaseConfig';
import AssMat from './AssMat'
import Parents from './Parents'
import Messages from './Messages'
//import { Test } from './Test';
//import { SearchResultsTpl } from './SearchResultsTpl';
import AssMatTpl from './AssMatTpl'



export default class Home extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        //selected: 0,
        results: [],
        assMatList: [],
        tab:0,
    }
    this._handleResults = this._handleResults.bind(this);
    this._hideSearchBar = this._hideSearchBar.bind(this);
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
                <TouchableOpacity onPress={() => this._showSearchBar()}>
                    <Icon name="search" color='#fff' size={23} 
                        style={{padding:5, marginRight:10}}                         
                    />                        
                </TouchableOpacity>
            </View>
        </View>
        )
    } 
    else {return(<View style={{padding: 0}}></View>)}    
    }

    _loadAssMatList() {
            /* if (this.searchedText.length > 0) {
              this.setState({
                isLoading: true
              }) */
 
        _getDataRef('AssMatDispo').on('value', (childSnapshot) => {
        this.setState({
            assMatList: childSnapshot.val()
            })
        }).bind(this)
    }
                
    componentDidMount() {
    this._loadAssMatList();
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
    
    render(){
        if (!this.state.searchBarExist){
            return (
            <Fragment>
                <StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />                 
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
                    <AssMat tabLabel="ASS MAT" {...this.props} />
                    <Parents tabLabel="PARENTS" {...this.props} />
                    <Messages tabLabel="MESSAGES" {...this.props} />
                </ScrollableTabView>
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    //data={items}
                    data={this.state.assMatList}
                    handleResults={this._handleResults}
                    placeholder = "Recherche..."
                    iconColor = "#F660AA"
                    //showOnLoad
                    onBack = {this._hideSearchBar}
                />  
            </Fragment>              
            )
        } 
     else{
      let pic = {uri: 'https://cdn.pixabay.com/photo/2013/02/21/19/10/mother-84628_960_720.jpg'};                   
        return (
            <Fragment>
                <StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />                 
                {this._renderHeader()}
                <View style={{ marginTop: 110 }}>
                    {/* <ImageBackground source={pic} style={{width: '100%', height: '100%'}}> */} 
                        <FlatList 
                            /* style={{padding:10, height: height * 0.8}} */
                            data = { this.state.results }
                            extraData = {this.props.favoritesAssMat}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem = {({item}) =>
                            <AssMatTpl
                                assMatItem={item}
                                // Ajout d'une props isAssMatFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                                /* isAssMatFavorite = {(this.props.favoritesAssMat.findIndex(assMatItem => 
                                assMatItem.id === item.id) !== -1) ? true : false}  */      
                                // _displayDetailsItem = {this._displayDetailsItem}              
                            />
                            }
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                            if(this.page < this.totalPages) { // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                                //this._loadAssMatList();
                            }
                            }} 
                            />
                    {/* </ImageBackground> */}
                </View>
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
                        {
                            ...this.searchBar.getValue() === undefined ? 
                            allDataOnEmptySearch = true : 
                            allDataOnEmptySearch = false
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
