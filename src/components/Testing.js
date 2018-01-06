import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
//import { store } from 'redux';
//import { Icon } from 'react-native-vector-icons';
import { searchChanged } from '../actions';
//import Card from './common/Card';
//import CardSection from './common/CardSection';
import Input from './common/Input';


class Testing extends Component {

  onSearchChange(text) {
    this.props.searchChanged(text);
  }

render() {
  console.log(this.props.search);
  return (
    <View>

        <Input
        //style={styles.searchbar}
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
//const mapDispatchToProps = (dispatch) => {
    //return {
      //  searchResult: (data) => dispatch(searchResult(data)),
    //}
//}

export default connect(mapStateToProps, { searchChanged })(Testing);
