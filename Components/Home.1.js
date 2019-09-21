import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SearchBar from 'react-native-searchbar';


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
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];
export default class Home extends Component {

_handleResults(results) {
  this.setState({ results });
}

render(){
    return(
        <View>
            <SearchBar
            ref={(ref) => this.searchBar = ref}
            data={items}
            handleResults={this._handleResults}
            showOnLoad
            />
        </View>
    )
}
}
