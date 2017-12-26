import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends Component {
  render() {
    const { textStyle, viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.headerText}</Text>
      </View>
      );
  }
}
  const styles = StyleSheet.create({
    viewStyle: {
     backgroundColor: '#f8f8f8',
     justifyContent: 'center',
     alignItems: 'center',
     height: 120,
     paddingTop: 15,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     elevation: 2,
     position: 'relative'
    },
    textStyle: {
      fontSize: 20
    }
  });
