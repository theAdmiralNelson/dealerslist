import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Madoka } from 'react-native-textinput-effects';
import { emailChanged, passwordChanged, loginUser, createUserPage } from '../actions';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';



class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onCreateButtonPress() {
    const { error } = this.props;
    this.props.createUserPage({ error });
    Actions.createUser();
  }

  onPasswordButtonPress() {
    const { error } = this.props;
    this.props.createUserPage({ error });
    Actions.password();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
      return (

      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Image
          source={require('../images/backgroundImage.png')}
          style={styles.container} />

        <Image
          source={require('../images/DealerslistWhiteLogo1350.png')}
          style={styles.pic}
        />


              <Madoka
               label={'Email'}
               // this is used as active and passive border color
               borderColor={'#aee2c9'}
               labelStyle={{ color: '#fff' }}
               inputStyle={{ color: '#fff' }}
               style={{ width: 200,
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
                 width: 200,
                 alignSelf: 'center'
               }}
               onChangeText={this.onPasswordChange.bind(this)}
               value={this.props.password}
               autoCapitalize={'none'}
               autoCorrect={false}
               secureTextEntry={true}
               returnKeyType={'done'}
              />


            <View style={{ flex: 1 }} >
              {this.renderButton()}
            </View>

            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>


            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', marginBottom: '25%' }}>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.onCreateButtonPress.bind(this)}>
                <Text
                style={{ color: '#fff',
                fontFamily: 'Pacifico-Regular',
                fontSize: 15,
                alignItems: 'center'
                //fontWeight: 700
                //fontStyle: 'regular'
               }}
                >
               Create A New Account
               </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.onPasswordButtonPress.bind(this)}>
                <Text
                style={{ color: '#fff',
                fontFamily: 'Pacifico-Regular',
                fontSize: 15
               }}
                >
                Forgot Your Password?
                </Text>
              </TouchableOpacity>
            </View>

      </View>
      );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#aee2c9',
    fontFamily: 'Pacifico-Regular',
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
  pic: {
    width: 210,
    height: 140,
    //margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '20%',
    marginBottom: '10%',
    opacity: 0.8,
    tintColor: '#dbdbdb'
  }
  //inputStyle: {

  //}
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, createUserPage })(LoginForm);
// <Input
//  label="Email"
  //autoCapitalize={'none'}
  //placeholder={'Email Address'}
  //onChangeText={this.onEmailChange.bind(this)}
  //value={this.props.email}
  //keyboardType={'email-address'}
  ///>

  //<Input
    //secureTextEntry={true}
    //autoCapitalize={'none'}
    //label="Password"
    //placeholder="password"
    //onChangeText={this.onPasswordChange.bind(this)}
    //value={this.props.password}
    //returnKeyType={'done'}
    //keyboardType={'email-address'}
  ///>
