import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

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
      opacity: 0.3,
      flexDirection: 'row',
      height: 66
    }
  });
