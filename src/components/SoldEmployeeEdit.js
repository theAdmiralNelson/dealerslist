import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Share,
  StyleSheet,
  Platform,
  BackHandler,
  ToastAndroid
 } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { entryUpdate, soldEntrySave, entryClear, entryDelete } from '../actions';
import Confirm from './common/Confirm';
import EmployeeForm from './EmployeeForm';


class SoldEmployeeEdit extends Component {
  state = { showModal: false };


  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.entryUpdate({ prop, value });
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
       try {
           Actions.sold();
           return true;
       } catch (err) {
           ToastAndroid.show("Cannot go back. Exiting the app...", ToastAndroid.SHORT);
           return true;
       }
   });
  }

  componentWillUnmount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.entryClear({ prop, value });
    });
  }

onButtonPress() {
  const { make, model, year, image, sold, price, description, miles } = this.props;
  this.props.soldEntrySave({
    make,
    model,
    year,
    image,
    sold,
    uid: this.props.employee.uid,
    price,
    description,
    miles
  });
  Actions.pop({ type: 'reset' });
}

onAccept() {
  const { uid } = this.props.employee;

  this.props.entryDelete({ uid });
}

onDecline() {
    this.setState({ showModal: false });
}

onBackButtonPress() {
  Actions.sold();
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
    .catch(err => console.log(err));
}

showResult(result) {
  console.log(result);
}

renderButton() {
  if (this.props.load === false) {
    return (
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
      );
    }
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
              flex: 1
            }}
            onPress={this.onBackButtonPress.bind(this)}
          >
            <Text
              style={{ color: '#fff',
              fontFamily: 'Pacifico-Regular',
              fontSize: 20,
              }}
            >
              <Icon name="chevron-left" /> Back
           </Text>
          </TouchableOpacity>

          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              flex: 2,
              justifyContent: 'center'
            }}
          >
           <Text
            style={{
             color: '#fff',
             fontSize: 20,
            }}
           >
             EDIT
           </Text>
         </View>


         <TouchableOpacity
          style={{
            flex: 1,
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
        {this.renderButton()}
        <View style={{ flex: 1 }} />

        <TouchableOpacity
         style={{
           flex: 4,
           alignItems: 'center',
           borderColor: 'white',
           borderRadius: 5
         }}
         onPress={() => this.setState({ showModal: !this.state.showModal })}
        >
        <Text
         style={{ color: '#fff',
         fontFamily: 'Pacifico-Regular',
         fontSize: 20,
         alignSelf: 'center'
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
    backgroundColor: '#414544',
    opacity: Platform.OS === 'ios' ? 0.3 : 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 77 : 77
  },
  footerStyle: {
    backgroundColor: '#414544',
    opacity: Platform.OS === 'ios' ? 0.3 : 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 55
  },
  utilityStyle: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 15 : 0
  },
  utilityButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});


const mapStateToProps = (state) => {
  const { make, model, year, image, sold, price, miles, description, load } = state.entryForm;

  return { make, model, year, image, sold, price, miles, description, load };
};

export default connect(mapStateToProps, {
  entryUpdate, soldEntrySave, entryClear, entryDelete
})(SoldEmployeeEdit);
