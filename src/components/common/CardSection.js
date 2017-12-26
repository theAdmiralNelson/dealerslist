import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class CardSection extends Component {
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
    borderWidth: 0,
    padding: 5,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    }
  });
