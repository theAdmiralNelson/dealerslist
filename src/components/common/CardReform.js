import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default class Card extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.children}
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    containerStyle: {
      //flex: 1,
      //borderWidth: 1,
      //borderRadius: 2,
      //borderColor: '#ddd',
      //borderBottomWidth: 0,
      backgroundColor: '#414544',
      //shadowOffset: { width: 0, heigth: 2 },
      opacity: Platform.OS === 'ios' ? 0.3 : 0.6,
      //shadowRadius: 2,
      //elevation: 1,
      //marginLeft: 0,
      //marginRight: 0,
      //marginTop: 10
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55
    }
  });
