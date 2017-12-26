import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    //flex: 1,
    //alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    width: 100,
    justifyContent: 'center',
    marginTop: -5,
    margin: 5,
    //marginRight: 5,
    alignSelf: 'center',

  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  }
});
