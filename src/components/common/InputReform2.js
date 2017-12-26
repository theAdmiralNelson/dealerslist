import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default class Input extends Component {
  render() {
    return (
      <View>
        <TextInput
          label={this.props.label}
          labelTextColor={'#fff'}
          placeholder={this.props.placeholder}
          placeholderTextColor={'#a6a7a8'}
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
          alignSelf={'center'}
          justifyContent={'center'}
          multiline={true}
          autoGrow={true}
          //backgroundColor={transparent}
          underlineColorAndroid={'transparent'}
          borderRadius={25}
          //opacity={0.6}
          textColor={'#000'}
        />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    width: 150,
    //color: '#000',
    paddingHorizontal: 10,
    borderColor: '#a6a7a8',
    color: '#000'
  },
  textStyle: {
    flex: 1,
    color: '#000'
  }

});
