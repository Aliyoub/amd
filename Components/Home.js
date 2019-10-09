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
        super(props)
        this.page = 0
        this.refAtStart = ''
        totalPages = 0
        this.state= {
            //selected: 0,
            results: [],
            assMatList: [],
            parentsList: [],
            tab: 0,
        }
        this._handleResults = this._handleResults.bind(this);
        this._hideSearchBar = this._hideSearchBar.bind(this);
        this._loadAssMatList = this._loadAssMatList.bind(this);
        this._loadParentsList = this._loadParentsList.bind(this);
        this._init = this._init.bind(this); // ???
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
                    <TouchableOpacity onPress = {
                        () => this.props.navigation.navigate(this.state.tab === 0 ? 'Favorites' : 'ParentsFavorites')
                    } >
                        <Icon name="favorite" color='#FFF' size={23} 
                            style={{padding:5, marginRight:10}}                         
                        />                        
                    </TouchableOpacity>
                </View>
                <View style={styles.rightHeaderContainer} style={{backgroundColor:'#FCA4F0', alignItems:'flex-end'}}>
                    <TouchableOpacity onPress = {
                        () => this.props.navigation.navigate('Favorites')
                    } >
                        <Icon name="mail" color='#FFF' size={23} 
                            style={{padding:5, marginRight:10}}                         
                        />                        
                    </TouchableOpacity>
                </View>
                <View style={styles.rightHeaderContainer} style={{backgroundColor:'#FCA4F0', alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={() => this._showSearchBar()}>
                        <Icon name="search" color='#FFF' size={23} 
                            style={{padding:5, marginRight:10}}                         
                        />                        
                    </TouchableOpacity>
                </View>
            </View>
            )
        } 
        else {return(<View style={{padding: 0, marginBottom:60}}></View>)}    
    }

    _init(){       
        _getDataRef('AssMatDispo').limitToFirst(1).once("value", function (childSnapshot) {
            this.lastRef = Object.keys(childSnapshot.val())
            alert(this.lastRef + 'okokok')
            });
    }

    _loadAssMatList() {
        this.page = this.page + 10
        // alert(this.page)
        //alert(this.state.offSet)

        // totalPages : Nombre total d'éléments dans AssMatDispo  
        /* this.totalPages  = _getDataRef('AssMatDispo').once("value", function (snap) {
        return snap.numChildren();
        }) ;
        
        // getRef : pour récupérer la clé du (this.page)ième élément  
        /* getRef = _getDataRef('AssMatDispo').limitToFirst(this.page).once("value", function (snap) {
            alert(Object.keys(snap.val()));
        }); */                    
        //alert(this.state.totalPages + ' ...' + this.state.lastRef)
        
        _getDataRef('AssMatDispo').limitToFirst(this.page).once("value", function (childSnapshot) {
            this.refAtStart = Object.keys(childSnapshot.val()).pop();
            //alert(this.refAtStart + '   refAtStart');
        })

        _getDataRef('AssMatDispo').
        orderByKey().
        startAt(this.refAtStart).
        //limitToFirst(10) Pour ne récupérer que 10 éléments (à partir de startAt(...)) à chaque chargement
        limitToFirst(20).on('value', (childSnapshot) => {
        const assMatList = [];
        childSnapshot.forEach((doc) => {
            assMatList.push({
                assMatKey: doc.key,
                assMatId: doc.toJSON().id.value,
                assMatThumbnail: doc.toJSON().picture.thumbnail,
                assMatFirstName: doc.toJSON().name.first,
                assMatLastName: doc.toJSON().name.last,
                assMatStreet: doc.toJSON().location.street,
                assMatCity: doc.toJSON().location.city,
                });
            });
            this.setState({
                assMatList: assMatList,
                loading: false,
                
            });
            //this.lastRef = this.state.assMatList[this.state.assMatList.length -1].assMatKey
        });
        
        _getDataRef('AssMatDispo').once("value", (childSnapshot) => {
            this.totalPages = childSnapshot.numChildren()               
            //alert(this.totalPages)
        })   
    }
    
    _loadParentsList() {
        this.page = this.page + 10
        // getRef : pour récupérer la clé du (this.page)ième élément          
        _getDataRef('Parents').limitToFirst(this.page).once("value", function (childSnapshot) {
            this.refAtStart = Object.keys(childSnapshot.val()).pop();
            //alert(this.refAtStart + '   refAtStart');
        })
        _getDataRef('Parents').
        orderByKey().
        startAt(this.refAtStart).
        //limitToFirst(10) Pour ne récupérer que 10 éléments (à partir de startAt(...)) à chaque chargement
        limitToFirst(10).on('value', (childSnapshot) => {
            const parentsList = [];
            childSnapshot.forEach((doc) => {
                parentsList.push({
                    parentKey: doc.key,
                    parentId: doc.toJSON().id,
                    //parentId: doc.toJSON().id.value,
                    parentThumbnail: doc.toJSON().picture.thumbnail,
                    parentFirstName: doc.toJSON().name.first,
                    parentLastName: doc.toJSON().name.last,
                    parentStreet: doc.toJSON().location.street,
                    parentCity: doc.toJSON().location.city,
                });
            });
            this.setState({
                parentsList: parentsList,
                loading: false,

            });
        });

        _getDataRef('Parents').once("value", (childSnapshot) => {
            // totalPages : Nombre total d'éléments dans Parents
            this.totalPages = childSnapshot.numChildren()
            //alert(this.totalPages)
        })
    }
    
    componentDidMount() {
    this._loadAssMatList();
    this._loadParentsList();
    }

    /* _displayDetailsItem = (assMatKey) => {
        //alert("Display item with id " + idDetailsItem)
        // pour récupérer les paramètres dans le component DetailsItem
        this.props.navigation.navigate("DetailsItem", {assMatKey: assMatKey})
    } */
    /* _displayParentsDetailsItem = (parentKey) => {
        this.props.navigation.navigate("ParentsDetailsItem", {parentKey: parentKey})
    } */
    
    
    render(){
        if (!this.state.searchBarExist){
            return (
            <Fragment>
                <StatusBar backgroundColor = '#F660AA' barStyle="dark-content" />                 
                {this._renderHeader()}
                {/*this._init()*/}
                <ScrollableTabView 
                    initialPage={0}
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
                        //navigation = {this.props.navigation}
                        _loadAssMatList = {this._loadAssMatList}
                        lastRef = {this.lastRef}
                        page={this.page}
                        totalPages = {this.totalPages}
                        {...this.props}
                    />
                    <Parents tabLabel = "PARENTS"
                        parentsList =  {this.state.parentsList}  
                        //navigation = {this.props.navigation}
                        _loadParentsList = {this._loadParentsList}
                        /* lastRef = {this.lastRef}
                        page={this.page}
                        totalPages = {this.totalPages} */
                        {...this.props}
                    />
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
        /* this.page = 0
        this.totalPages = 0
        this.setState({
            assMatList: [],
            }, () => {
                this._loadAssMatList()
        }) */                 
        return (
            <Fragment>
                <StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />                 
                {this._renderHeader()}
                <AssMat
                   assMatList = {this.state.results}                                         
                   navigation = {this.props.navigation}
                   _loadAssMatList = {this._loadAssMatList}
                   page={this.page}
                   totalPages = {this.totalPages}

                   // Ici on ajoute simplement un booléen à false 
                   //pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des AssMat favoris. 
                   //Et ainsi pouvoir déclencher le chargement de plus de AssMat lorsque l'utilisateur scrolle.
                   favoriteList={false} 
                   ParentsFavoriteList={false} 
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
    logoText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "flex-start",
        marginLeft: 10
    },
});
