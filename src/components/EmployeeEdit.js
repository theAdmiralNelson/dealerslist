import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Share,
  StyleSheet,
  Platform
 } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Actions } from 'react-native-router-flux';
//import Share, { ShareSheet, Button } from 'react-native-share';
import { entryUpdate, entrySave, entryClear, entryDelete } from '../actions';
import Card from './common/Card';
import CardSection from './common/CardSection';
//import Button from './common/Button';
import Confirm from './common/Confirm';
import EmployeeForm from './EmployeeForm';


class EmployeeEdit extends Component {
  state = { showModal: false };


  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.entryUpdate({ prop, value });
      console.log(this.props.employee);
    });
  }

  componentWillUnmount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.entryClear({ prop, value });
    });
  }

onButtonPress() {
  const { make, model, year, image, sold, price, description, miles } = this.props;
  console.log(this.props.employee.sold);
  this.props.entrySave({ make, model, year, image, sold, uid: this.props.employee.uid, price, description, miles });
}

onAccept() {
  const { uid } = this.props.employee;

  this.props.entryDelete({ uid });
}

onDecline() {
    this.setState({ showModal: false });
}

onBackButtonPress() {
  Actions.employeeList();
}

onShareButtonPress() {
  const { image, make, model, year, price, miles, description } = this.props.employee;
  //const test = JSON.stringify(image);
  //console.log(test);
  //console.log(image);
  Share.share({
    message: 'Here\'s the latest addition to our inventory:' + ' ' + 'Make: ' + make +
    ' ' + 'Model: ' + model + ' ' + 'Year: ' + year + ' ' + 'Miles/Hours: ' + miles + ' ' + 'Price: '
    + price + ' ' + 'Description' + description + ' ',
    url: image,
    title: 'Dealerslist Image'
  }, {
    // Android only:
    dialogTitle: 'Share Dealerslist goodness',
    // iOS only:
    //excludedActivityTypes: [
      //'com.apple.UIKit.activity.PostToTwitter'
    //]
  })
  //.then(this.showResult)
    .catch(err => console.log(err));
}

showResult(result) {
  console.log(result);
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
      //justifyContent: 'space-around',
      //flexDirection: 'row',
      //marginLeft: '5%'
      //backgroundColor: 'black',
      flex: 1
      }}
    onPress={this.onBackButtonPress.bind(this)}
    >
      <Text
      style={{ color: '#fff',
      fontFamily: 'Pacifico-Regular',
      fontSize: 20,
      //justifyContent: 'space-between',
      //flexDirection: 'column',
     }}
      >
      <Icon name="chevron-left" /> Back
     </Text>
     </TouchableOpacity>

     <View
     style={{ alignSelf: 'center',
     alignItems: 'center',
     flex: 2,
     //backgroundColor: 'black',
     justifyContent: 'center'
   }}
   >
     <Text
     style={{ color: '#fff',
     fontSize: 20,
     //flexDirection: 'row',
     //justifyContent: 'center',
     //alignSelf: 'center',
     //alignSelf: 'center',
     //marginTop: '10%'
     }}
     >
      EDIT
    </Text>
    </View>


  <TouchableOpacity
    style={{
      //flexDirection: 'row',
      //marginRight: '5%'
      flex: 1,
      //backgroundColor: 'black',
      //alignItems: 'center'
      justifyContent: 'space-around'
    }}
    onPress={this.onShareButtonPress.bind(this)}
  >
    <Text
    style={{ color: '#fff',
    fontSize: 20,
    fontFamily: 'Pacifico-Regular'
    }}
    >
      Share <Icon name="share-square-o" style={{ fontSize: 20 }} />
    </Text>
  </TouchableOpacity>

      </View>
    </View>
<ScrollView>
        <EmployeeForm {...this.props} />


  </ScrollView>
  <View style={styles.footerStyle}>
  <View style={styles.utilityButtonStyle}>
  <TouchableOpacity style={{ flex: 4, alignItems: 'center' }} onPress={this.onButtonPress.bind(this)}>
  <Text
  style={{ color: '#fff',
  fontFamily: 'Pacifico-Regular',
  fontSize: 20,
  alignSelf: 'center'
  }}
  >
 Save Changes
 </Text>
  </TouchableOpacity>

  <View style={{ flex: 1 }} />



   <TouchableOpacity style={{ flex: 4, alignItems: 'center', borderColor: 'white', borderRadius: 5 }} onPress={() => this.setState({ showModal: !this.state.showModal })}>
   <Text
   style={{ color: '#fff',
   fontFamily: 'Pacifico-Regular',
   fontSize: 20,
   alignSelf: 'center',
   //marginLeft: '25%'
  }}
   >
  Delete
  </Text>
   </TouchableOpacity>


  <Confirm
    visible={this.state.showModal}
    onAccept={this.onAccept.bind(this)}
    onDecline={this.onDecline.bind(this)}
  >
  Are you sure you want to delete this entry?
  </Confirm>
  </View>
  </View>
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
    height: Platform.OS === 'ios' ? 77 : 77
  },
  footerStyle: {
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
    paddingTop: Platform.OS === 'ios' ? 15 : 0
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
    //alignItems: 'baseline',
    justifyContent: 'space-around',
    //marginTop: '10%'
    //height: 66
  }
});


const mapStateToProps = (state) => {
  const { make, model, year, image, sold, price, miles, description } = state.entryForm;

  return { make, model, year, image, sold, price, miles, description };
};

export default connect(mapStateToProps, {
  entryUpdate, entrySave, entryClear, entryDelete
 })(EmployeeEdit);
