import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Platform } from 'react-native';

export default class Input extends Component {
  render() {
    return (
      <View>
        <TextInput
          label={this.props.label}
          labelTextColor={'#fff'}
          placeholder={this.props.placeholder}
          placeholderTextColor={'#fff'}
          //placeholderOpacity={0.9}
          autoCorrect={false}
          style={styles.inputStyle}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          borderWidth={2}
          //alignSelf={'center'}
          //justifyContent={'center'}
          underlineColorAndroid={'transparent'}
          //backgroundColor={'transparent'}
          borderRadius={20}
          //opacity={0.6}
          textColor={'#fff'}
        />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    //height: 30,
    height: Platform.OS === 'ios' ? 30 : 35,
    width: 120,
    //color: '#000',
    paddingHorizontal: 10,
    borderColor: '#fff',
    color: '#fff'
  },
  textStyle: {
    //flex: 1,
    color: '#fff'
  }

});
