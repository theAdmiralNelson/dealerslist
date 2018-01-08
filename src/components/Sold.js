import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { soldResult, entryClear, logoutUser } from '../actions';
import Testing from './Testing';
import SoldSliderEntry from './SoldSliderEntry';
import SoldSearchedEntriesSelector from '../selectors/soldSearchedEntries';


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

  createDataSource({ entries }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(entries);
    }


  renderRow(employee) {
    return (
            <SoldSliderEntry employee={employee} style={{ alignSelf: 'center' }} />
  );
}


  render() {
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
              style={{
              color: '#fff',
              fontFamily: 'Pacifico-Regular',
              fontSize: 20,
              alignSelf: 'center'
              }}
            >
              <Icon name="chevron-left" /> Listed
            </Text>
          </TouchableOpacity>


          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  paddingBottom: 5,
                  paddingTop: Platform.OS === 'ios' ? 20 : 5
                }}
              >
                SOLD ITEMS
              </Text>
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
        style={{
          paddingTop: 20,
          width: '100%',
          backgroundColor: 'transparent',
          elevation: 28
        }}
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
    backgroundColor: '#414544',
    opacity: Platform.OS === 'ios' ? 0.3 : 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 88 : 88
  },
  footerStyle: {
    backgroundColor: '#414544',
    opacity: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 55
  },
  utilityStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  utilityButtonStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state) => {

  const employees = state.employees;
  return {
    employees,
    entries: SoldSearchedEntriesSelector(state)
   };
};

export default connect(mapStateToProps, { soldResult, entryClear, logoutUser })(EmployeeList);
