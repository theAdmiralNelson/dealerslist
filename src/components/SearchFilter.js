import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import Input from './common/Input';
import ListItem from './ListItem';
import { entryFetch } from '../actions';


class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      currentlyDisplayed: this.props.employees

    };
      console.log(this.props.employees);
  }

  componentWillMount() {
    this.props.entryFetch();

    this.createDataSource(this.props);
}

    createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
      return <ListItem employee={employee} />;
    }

render() {
  return (
    <View>
        <Input
          label="Search"
          placeholder="John Deere"
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />

    </View>
      );
    }
  }

  const mapStateToProps = (state) => {
    const employees = _.map(state.employees, (val, uid) => {
      return { ...val, uid };
    });
    return { employees };
  };

  export default connect(mapStateToProps, { entryFetch })(SearchFilter);
