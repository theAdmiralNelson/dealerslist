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
  constructor(props) {
    super(props)
    this.state = { searchText: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }



  handleSubmitSearch() {
    this.props.searchChanged(this.state.searchText)
  }
  handleChange(value) {
    this.setState({
      searchText: value
    });
  }


  render() {
    //const myIcon = (<Icon name="rocket" size={30} color="#900" />)
    return (
      <View>

        <Input
          //style={styles.searchbar}
          placeholder="Search"
          onChangeText={this.handleChange}
          value={this.state.searchText}
          returnKeyType={'search'}
        />
        <Button onPress={this.handleSubmitSearch} >Search!</Button>
      </View>
    );
  }
}


const mapStateToProps = (state) => {

  const { search } = state.employees;
  return { search };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchResult: (data) => dispatch(searchChanged(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
