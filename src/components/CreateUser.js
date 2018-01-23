import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ToastAndroid 
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Madoka } from 'react-native-textinput-effects';
import {
  emailChanged,
  passwordChanged,
  createUser,
  createUserPage
} from '../actions';
import Button from './common/Button';
import Spinner from './common/Spinner';


class CreateUser extends Component {
  componentWillMount(){
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
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.createUser({ email, password });
  }

  onLoginButtonPress() {
    const { error } = this.props;
    this.props.createUserPage({ error });
    Actions.login();
  }

  onPasswordButtonPress() {
    Actions.password();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Create Account
      </Button>
    );
  }

  render() {
      return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Image
          source={require('../images/createUser-background.png')}
          style={styles.container}
        />

          <View style={{ paddingTop: '60%' }}>
              <Madoka
               label={'Email'}
               // this is used as active and passive border color
               borderColor={'#aee2c9'}
               labelStyle={{ color: '#fff' }}
               inputStyle={{ color: '#fff' }}
               style={{ width: 250,
               alignSelf: 'center'
               }}
               onChangeText={this.onEmailChange.bind(this)}
               value={this.props.email}
               autoCapitalize={'none'}
               autoCorrect={false}
               keyboardType={'email-address'}
               returnKeyType={'done'}
              />


              <Madoka
               label={'Password'}
               // this is used as active and passive border color
               borderColor={'#aee2c9'}
               labelStyle={{ color: '#fff' }}
               inputStyle={{ color: '#fff' }}
               style={{
                 width: 250,
                 alignSelf: 'center'
               }}
               onChangeText={this.onPasswordChange.bind(this)}
               value={this.props.password}
               autoCapitalize={'none'}
               autoCorrect={false}
               secureTextEntry={true}
               returnKeyType={'done'}
              />
              </View>


            <View style={{ flex: 2 }} >
              {this.renderButton()}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', marginTop: '10%' }}>
              <TouchableOpacity onPress={this.onLoginButtonPress.bind(this)}>
                <Text
                style={{ color: '#fff',
                marginBottom: '60%',
                fontFamily: 'Pacifico-Regular',
                fontSize: 20
               }}
                >
                Back To Login
               </Text>
              </TouchableOpacity>
            </View>


            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>

        </View>
      );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#aee2c9',
    fontFamily: 'Pacifico-Regular',
    marginBottom: 40
  },
  container: {
    position: 'absolute',
    flex: 1,
    width: undefined,
    height: undefined,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85
  },
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  createUser,
  createUserPage
})(CreateUser);
