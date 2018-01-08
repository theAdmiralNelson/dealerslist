import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.buttonStyle}
      >
        <Text
          style={styles.textStyle}
        >
          {this.props.children}
        </Text>
      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#a6a7a8',
    width: 250,
    justifyContent: 'center',
    marginTop: -5,
    alignSelf: 'center',

  },
  textStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  }
});
