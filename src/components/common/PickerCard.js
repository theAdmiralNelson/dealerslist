import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class PickerCard extends Component {
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
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
    }
  });
