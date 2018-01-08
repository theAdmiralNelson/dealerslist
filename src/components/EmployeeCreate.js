import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform
 } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { entryUpdate, entryCreate } from '../actions';
import CardReform from './common/CardReform';
import CreateForm from './CreateForm';

class EmployeeCreate extends Component {

componentWillMount() {
    this.setState({ make: '', model: '', year: '', image: '', sold: '' });
  }

onButtonPress() {
  const { make, model, year, image, sold, price, description, miles } = this.props;

 this.props.entryCreate(
   { make,
     model,
     year: year || '1950',
     image,
     sold,
     price,
     description,
     miles }
 );
}

onBackButtonPress() {
  Actions.employeeList();
}

renderButton() {
  if (this.props.image && this.props.make) {
    return (
      <TouchableOpacity
       onPress={this.onButtonPress.bind(this)}
       style={{
        justifyContent: 'center'

      }}
      >
       <Text
       style={{ color: '#fff',
       fontSize: 20,
       fontFamily: 'Pacifico-Regular',
       alignSelf: 'center'
       }}
       >
        <Icon name="plus-square-o" size={20} color="#fff" /> Create
      </Text>


    </TouchableOpacity>
    );
  } else {
      return (
        <Text
        style={{ color: '#fff',
        fontSize: 10,
        alignSelf: 'center'
        }}
        >
          MUST ADD A PHOTO AND MAKE TO CREATE AN ITEM
        </Text>
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
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
                onPress={this.onBackButtonPress.bind(this)}
              >

                  <Text
                    style={{ color: '#fff',
                    fontFamily: 'Pacifico-Regular',
                    fontSize: 20,
                    justifyContent: 'center',
                    }}
                  >
                    <Icon name="chevron-left" /> Back
                  </Text>

              </TouchableOpacity>

              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 2 }}>
                <Text
                style={{
                  color: '#fff',
                  fontSize: 15
                }}
                >
                 CREATE AN ITEM
                </Text>
              </View>

             <View style={{ flex: 1 }} />
           </View>
         </View>

        <ScrollView>
          <CreateForm {...this.props} />
        </ScrollView>

        <CardReform>
          {this.renderButton()}
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
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 15 : 0
  },
  utilityButtonStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state) => {
  const { make, model, year, uid, image, sold, price, description, miles } = state.entryForm;

  return { make, model, year, uid, image, sold, price, description, miles };
};

export default connect(mapStateToProps, {
  entryUpdate,
  entryCreate,
})(EmployeeCreate);
