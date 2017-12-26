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

render() {
  //const myIcon = (<Icon name="rocket" size={30} color="#900" />)
  return (
    <View>

        <Input
        //style={styles.searchbar}
        placeholder="Search"
        onChangeText={value => this.props.searchChanged(value)}
        value={this.props.search}
        returnKeyType={'search'}
        />

    </View>
  );
}
}


const mapStateToProps = (state) => {

  const { search } = state.employees;
  return { search };
};
//const mapDispatchToProps = (dispatch) => {
    //return {
      //  searchResult: (data) => dispatch(searchResult(data)),
    //}
//}

export default connect(mapStateToProps, { searchChanged })(Testing);
