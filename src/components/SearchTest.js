import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { test, entryClear, logoutUser } from '../actions';
import CardReform from './common/CardReform';
import Button from './common/Button';
import Input from './common/Input';
import SliderEntry from './SliderEntry';


class SearchTest extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
    }


  componentWillMount() {

  this.props.test();


    this.createDataSource(this.props);
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

    handleSubmitSearch() {
       this.props.test();
       console.log(this.props.testing);
     }
     handleChange(text) {
       this.setState({
         searchText: text
       });
       //this.props.test(this.state.searchText);
     }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
    }


  renderRow(employee) {

    return (
            <SliderEntry employee={employee} style={{ alignSelf: 'center' }} />

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
        <Text style={{ alignSelf: 'center', color: 'white', paddingBottom: 5, paddingTop: Platform.OS === 'ios' ? 20 : 5 }}>LISTED ITEMS</Text>
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

      <Input
      //style={styles.searchbar}
      placeholder="Search"
      onChangeText={this.handleChange.bind(this)}
      value={this.state.searchText}
      returnKeyType={'search'}
      />

      <Button onPress={this.handleSubmitSearch.bind(this)} >Search!</Button>


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
    height: Platform.OS === 'ios' ? 88 : 88,
    marginBottom: Platform.OS === 'ios' ? 0 : 18,
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
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-around',
    //justifyContent: 'center',
    //paddingBottom: Platform.OS === 'ios' ? 10 : 0
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
  const employees = _.map(state.testing, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};

export default connect(mapStateToProps, { test, entryClear, logoutUser })(SearchTest);
//#9bc5c3
