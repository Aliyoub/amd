import React, {Fragment} from 'react'
import {StyleSheet, View, StatusBar, Text, TouchableOpacity, FlatList, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from 'react-native-searchbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

import  {_getDataRef}  from '../Firebase/FirebaseConfig';
import AssMat from './AssMat'
import Parents from './Parents'
import Messages from './Messages'

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			//selected: 0,
			results: [],
			assMatList: [],
			tab:0,
		}
	}
	render(){
		return (
			<Fragment>
				<StatusBar backgroundColor= '#F660AA' barStyle="dark-content" />                 
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
			</Fragment>              
		)
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
