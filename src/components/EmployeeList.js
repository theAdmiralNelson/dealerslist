import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  BackHandler,
  ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { searchResult, entryClear, logoutUser } from '../actions';
import CardReform from './common/CardReform';
import Testing from './Testing';
import SliderEntry from './SliderEntry';
import SearchedEntriesSelector from '../selectors/searchedEntries';


class EmployeeList extends Component {
  componentWillMount() {
    this.props.searchResult();
    this.createDataSource(this.props);
     BackHandler.addEventListener('hardwareBackPress', () => {
        try {
            Actions.pop();
            return true;
        } catch (err) {
            ToastAndroid.show("Cannot go back. Exiting the app...", ToastAndroid.SHORT);
            return true;
        }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onLogoutButtonPress() {
    this.props.logoutUser();
  }


  onSoldButtonPress() {
    const { make, model, year, image, price, miles, description } = this.props;
    this.props.entryClear({ make, model, year, image, price, miles, description });
    Actions.sold();
  }


  onAddButtonPress() {
    const { make, model, year, image, price, miles, description } = this.props;
    this.props.entryClear({ make, model, year, image, price, miles, description });
    Actions.employeeCreate();
  }

  createDataSource({ entries }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(entries);
  }


  renderRow(employee) {
    return (
      <SliderEntry
        employee={employee}
        style={{ alignSelf: 'center' }}
      />
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
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center'
              }}
              onPress={this.onAddButtonPress.bind(this)}
            >
              <Text
              style={{ color: '#fff',
              fontFamily: 'Pacifico-Regular',
              fontSize: 20,
              }}
              >
                Add <Icon name="plus" size={20} color="#fff" style={{ padding: 5 }} />
              </Text>

            </TouchableOpacity>
            <View style={{ alignSelf: 'center', alignItems: 'center', flex: 1 }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  paddingBottom: 5,
                  paddingTop: Platform.OS === 'ios' ? 20 : 5
                }}
              >
                LISTED ITEMS
              </Text>
              <Testing style={{ alignSelf: 'center' }} />
            </View>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <Text
                onPress={this.onSoldButtonPress.bind(this)}
                style={{ color: '#fff',
                fontFamily: 'Pacifico-Regular',
                fontSize: 20
                }}
              >
               Sold <Icon name="chevron-right" />
              </Text>
            </TouchableOpacity>
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
              style={{ width: '100%', backgroundColor: 'transparent', elevation: 28 }}
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
        />
        <CardReform>
          <TouchableOpacity>
            <Text
              onPress={this.onLogoutButtonPress.bind(this)}
              style={{ color: '#fff',
              fontFamily: 'Pacifico-Regular',
              fontSize: 20,
              alignSelf: 'center',
              marginBottom: 10
              }}
            >
              Logout
           </Text>
        </TouchableOpacity>
      </CardReform>
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
    height: Platform.OS === 'ios' ? 88 : 88,
    marginBottom: Platform.OS === 'ios' ? 0 : 18,
  },
  footerStyle: {
    backgroundColor: '#414544',
    opacity: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 55
  },
  utilityStyle: {
    flexDirection: 'row',
    alignItems: 'center',
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
    entries: SearchedEntriesSelector(state)
   };
};

export default connect(mapStateToProps, { searchResult, entryClear, logoutUser })(EmployeeList);
