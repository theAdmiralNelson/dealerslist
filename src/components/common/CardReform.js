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
      backgroundColor: '#414544',
      opacity: Platform.OS === 'ios' ? 0.3 : 0.6,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55
    }
  });
