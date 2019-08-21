import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { _getDataRef } from '../Firebase/FirebaseConfig'

class DetailsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assMatItem: undefined,
      isLoading: true
    }
  }

   componentDidMount() {
   /* _getDataRef(this.props.navigation.state.params.idDetailsItem).then(data => {
      this.setState({
        assMatItem: data,
        isLoading: false
      })
      alert(assMatItem.email)
    })*/

    /* return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    }); */
    alert(this.props.navigation.state.params.idDetailsItem)
  } 

  render() {
    return (
      <View style={styles.main_container}>
        <Text>Détail de l'item {this.props.navigation.state.params.idDetailsItem}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default DetailsItem