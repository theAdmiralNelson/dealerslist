import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
//import ListItem from './ListItem';
import { entryFetch, soldResult, entryClear, logoutUser } from '../actions';
import Card from './common/Card';
import CardReform from './common/CardReform';
//import CardSection from './common/CardSection';
//import Input from './common/Input';
import Testing from './Testing';
import SoldSliderEntry from './SoldSliderEntry';

//import ImageUpload from './ImageUpload';


class EmployeeList extends Component {
  componentWillMount() {

  this.props.soldResult();


    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    }


    onBackButtonPress() {
      Actions.employeeList();
    }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
    }


  renderRow(employee) {

    return (
            <SoldSliderEntry employee={employee} style={{ alignSelf: 'center' }} />

  );
}


  render() {

  //  console.log(this.props.employees);
    //this.props.searching);
    return (
  <LinearGradient
    colors={['#fff', '#bec3c3']}
    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
    style={{ flex: 1 }}
  >
  <View style={styles.containerStyle}>

    <View style={styles.utilityStyle}>
  <TouchableOpacity
  style={{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
    }}
  onPress={this.onBackButtonPress.bind(this)}
  >
    <Text
    style={{ color: '#fff',
    fontFamily: 'Pacifico-Regular',
    fontSize: 20,
    alignSelf: 'center'
   }}
    >
    <Icon name="chevron-left" /> Back
   </Text>
   </TouchableOpacity>


    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ alignSelf: 'center', color: 'white', paddingBottom: 5, paddingTop: Platform.OS === 'ios' ? 20 : 5 }}>SOLD ITEMS</Text>
        <Testing style={{ alignSelf: 'center' }} />
    </View>
          <View style={{ flex: 1 }} />


        </View>
      </View>

      <Text
      style={{
        fontSize: 16,
        alignSelf: 'center',
        color: '#aee2c9',
        fontFamily: 'Pacifico-Regular'
      }}
      >
        {this.props.error}
      </Text>

      <ListView
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ paddingTop: 20, width: '100%', backgroundColor: 'transparent', elevation: 28 }}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
      />
    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    //flex: 1,
    //borderWidth: 1,
    //borderRadius: 2,
    //borderColor: '#ddd',
    //borderBottomWidth: 0,
    backgroundColor: '#414544',
    //shadowOffset: { width: 0, heigth: 2 },
    opacity: Platform.OS === 'ios' ? 0.3 : 0.6,
    //shadowRadius: 2,
    //elevation: 1,
    //marginLeft: 0,
    //marginRight: 0,
    //marginTop: 10
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: '10%'
    height: Platform.OS === 'ios' ? 88 : 88
  },
  footerStyle: {
    //flex: 1,
    //borderWidth: 1,
    //borderRadius: 2,
    //borderColor: '#ddd',
    //borderBottomWidth: 0,
    backgroundColor: '#414544',
    //shadowOffset: { width: 0, heigth: 2 },
    opacity: 0.3,
    //shadowRadius: 2,
    //elevation: 1,
    //marginLeft: 0,
    //marginRight: 0,
    //marginTop: 10
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: '10%'
    height: 55
  },
  utilityStyle: {
    //flex: 1,
    //borderWidth: 1,
    //borderRadius: 2,
    //borderColor: '#ddd',
    //borderBottomWidth: 0,
    //backgroundColor: '#414544',
    //shadowOffset: { width: 0, heigth: 2 },
    //opacity: 0.3,
    //shadowRadius: 2,
    //elevation: 1,
    //marginLeft: 0,
    //marginRight: 0,
    //marginTop: 10
    alignItems: 'center',
    //justifyContent: 'space-around',
    //paddingTop: Platform.OS === 'ios' ? 15 : 0,
    flexDirection: 'row',

    //alignItems: 'baseline',
    //justifyContent: 'space-around',
    //marginTop: '10%'
    //height: 66
  },
  utilityButtonStyle: {
    //flex: 1,
    //borderWidth: 1,
    //borderRadius: 2,
    //borderColor: '#ddd',
    //borderBottomWidth: 0,
    //backgroundColor: '#414544',
    //shadowOffset: { width: 0, heigth: 2 },
    //opacity: 0.3,
    //shadowRadius: 2,
    //elevation: 1,
    //marginLeft: 0,
    //marginRight: 0,
    //marginTop: 10
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
    //marginTop: '10%'
    //height: 66
  }
});

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  console.log(employees);
  return { employees };
};

export default connect(mapStateToProps, { soldResult, entryClear, logoutUser })(EmployeeList);
//#9bc5c3
