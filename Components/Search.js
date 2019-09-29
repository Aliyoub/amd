import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity, StyleSheet
} from 'react-native';

import SearchBar from 'react-native-searchbar';
import  {_getDataRef}  from '../Firebase/FirebaseConfig';


export default class Search extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      assMatList: [],
      results: [],
    };        
      this._loadAssMatList = this._loadAssMatList.bind(this);
      this._handleResults = this._handleResults.bind(this);
    }         
    
_loadAssMatList() {
  /* if (this.searchedText.length > 0) {
    this.setState({
      isLoading: true
    }) */
  _getDataRef('AssMatDispo').on('value', (childSnapshot) => {
    this.setState({
      //assMatList: Object.values(childSnapshot.val()),
      assMatList: [...this.state.assMatList, ...Object.values(childSnapshot.val())],
      //loading: false,
    });
  })
}
      
  _handleResults(results) {
    this.setState({ results });
  }
           
  componentDidMount() {
    this._loadAssMatList();
  }

  render() {
    return (
      <View>
        <View style={{ marginTop: 110 }}>
          {
            this.state.results.map((result, i) => {
              return (
                 <Text key={i}>
                   {typeof result === 'object' && !(result instanceof Array) ? 'gold object!' :
                    result.toString() } {result.id.value.toString()}
                </Text> 
              );
            })
          }
          <TouchableOpacity onPress={() => this.searchBar.show()}>
            <View style={{ backgroundColor: 'green', height: 100, marginTop: 50 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.searchBar.hide()}>
            <View style={{ backgroundColor: 'red', height: 100 }}/>
          </TouchableOpacity>
        </View>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={this.state.assMatList}
          handleResults={this._handleResults}
          showOnLoad
        />
      </View>
    );
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
  }
})