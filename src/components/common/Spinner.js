import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


export default class Spinner extends Component {
  render() {
    return (
      <View style={styles.spinnerStyle} size={this.props.size || 'large'}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
