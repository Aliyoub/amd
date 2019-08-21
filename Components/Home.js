import React, {Fragment} from 'react'
import {StyleSheet, View, StatusBar, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from 'react-native-searchbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

import AssMat from './AssMat'
import Parents from './Parents'
import Messages from './Messages'

const items = [
    1337,
    'janeway',
    {
        lots: 'of',
        different: {
            types: 0,
            data: false,
            that: {
                can: {
                    be: {
                        quite: {
                            complex: {
                                hidden: ['gold!'],
                            },
                        },
                    },
                },
            },
        },
    },
    [4, 2, 'tree'],
];

export default class Home extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        selected: 0,
        results: []
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
        /* <View style={styles.headerContainer}>
            <View style={styles.leftHeaderContainer}>
            <Text style={styles.logoText}>WhatsApp</Text>
            </View>
            <View style={styles.rightHeaderContainer}>
            <Icon name="search" color='#fff' size={23} style={{ padding:5 }} onPress={() => this._showSearchBar()}/>
            <Icon name={this._getIcon()} onPress={()=> this._onIconPress()} color='#fff' size={23} style={{ padding:5 }} />
            {this._renderMenuHeader()}
            </View>
        </View> */

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
                    {/* <Icon name="call" color='#fff' size={23} style={{padding:5}} />
                <Icon name="more-vert" color='#fff' size={23} style={{padding:5}}/> */}
            </View>
        </View>

        )
    } 
    else {return(<View style={{padding: 0}}></View>)}    
    }
    
    render(){
        return(
            <Fragment >
                <StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />                 
                {this._renderHeader()}
                <ScrollableTabView 
                    initialPage={0}
                    tabBarUnderlineStyle = {{backgroundColor: "#fff", height:2.5}} 
                    tabBarBackgroundColor = "#FCA4F0" 
                    tabBarActiveTextColor = "#fff" 
                    tabBarInactiveTextColor = "#F660AA" 
                    onChangeTab={(index) => this.handleChangeTab(index)}
                    >
                    {/* <Home tabLabel="HOME" /> */}
                    <AssMat tabLabel="ASS MAT" {...this.props} />
                    <Parents tabLabel="PARENTS" {...this.props} />
                    <Messages tabLabel="MESSAGES" {...this.props} />
                </ScrollableTabView>

                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    //data={[]}
                    data={items}
                    handleResults={this._handleResults}
                    placeholder="Recherche..."
                    iconColor = "#F660AA"
                    onBack={this._hideSearchBar}
                />    
            </Fragment>
        )
    }  
    handleChangeTab(index) {
        this.setState({ selected: index.i });
        //alert(this.state.selected)
    }   
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
