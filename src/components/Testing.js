import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { searchChanged } from '../actions';
import Input from './common/Input';


class Testing extends Component {

  onSearchChange(text) {
    this.props.searchChanged(text);
  }

  render() {
    return (
      <View>

          <Input
            placeholder="Search"
            onChangeText={this.onSearchChange.bind(this)}
            value={this.props.search}
            returnKeyType={'search'}
            autoCapitalize='none'
          />

      </View>
    );
  }
}


const mapStateToProps = ({ searching }) => {

  const { search } = searching;
  return { search };
};

export default connect(mapStateToProps, { searchChanged })(Testing);
