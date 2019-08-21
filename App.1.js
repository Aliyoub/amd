import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import React from 'react'
import {StyleSheet, View, StatusBar, Text, TouchableOpacity, Button, ScrollView} from 'react-native'
import {
    fetch
} from 'fetch';
import Icon from 'react-native-vector-icons/MaterialIcons';


import Home from './Components/Home'
import AssMat from './Components/AssMat'
import Parents from './Components/Parents'
//import SearchContainer from './SearchContainer'

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }
    render(){
        return(
            <View>
                <StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />
                <View style={styles.HeaderContainer} style={{backgroundColor:'#FCA4F0', flexDirection:'row'}}>
                    <View style={styles.leftHeaderContainer} style={{justifyContent:'center', flex:1 }}>
                        <Text style={styles.logoText}>AssMatDispo</Text>
                    </View>
                    <View style={styles.rightHeaderContainer} style={{backgroundColor:'#FCA4F0', alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => this._mySearchMethod()}>
                            <Icon name="search" color='#fff' size={23} style={{padding:5, marginRight:10}} />                        
                        </TouchableOpacity>
                         {/*<Icon name="call" color='#fff' size={23} style={{padding:5}} />
                        <Icon name="more-vert" color='#fff' size={23} style={{padding:5}}/> */}
                    </View>
                </View>
                <ScrollView>
                    <ScrollableTabView 
                        initialPage={1}
                        tabBarUnderlineStyle = {{backgroundColor: "#fff", height:2.5}} 
                        tabBarBackgroundColor = "#FCA4F0" 
                        tabBarActiveTextColor = "#fff" 
                        tabBarInactiveTextColor = "#F660AA" 
                        onChangeTab={(index) => this.handleChangeTab(index)}
                    >
                        {/* <SearchContainer tabLabel="SEARCH" /> */}
                        {/* <View Home tabLabel="HOME" {...this.props} /> */}
                        <Home tabLabel="HOME" {...this.props} />
                        <AssMat tabLabel="ASS MAT" {...this.props} />
                        <Parents tabLabel="PARENTS" {...this.props} />
                    </ScrollableTabView>        
                </ScrollView>                
            </View>           
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
