import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Madoka } from 'react-native-textinput-effects';
import { emailAdChanged, resetPassword } from '../actions';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';



class PasswordReset extends Component {
  onEmailAdChange(text) {
    this.props.emailAdChanged(text);
  }

  onButtonPress() {
    const { emailAd } = this.props;

    this.props.resetPassword({ emailAd });
    Actions.login();
  }

  onLoginButtonPress() {
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
        Reset Your Password
      </Button>
    );
  }

  render() {
      return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Image
          source={require('../images/createUser-background.png')}
          style={styles.container} />

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
               onChangeText={this.onEmailAdChange.bind(this)}
               value={this.props.emailAd}
               autoCapitalize={'none'}
               autoCorrect={false}
               keyboardType={'email-address'}
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
                //fontWeight: 700
                //fontStyle: 'regular'
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


  //inputStyle: {

  //}
};

const mapStateToProps = ({ pw }) => {
  const { emailAd, error, loading } = pw;

  return { emailAd, error, loading };
};

export default connect(mapStateToProps, { emailAdChanged, resetPassword })(PasswordReset);

/*import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
//import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, resetPassword } from '../actions';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';


class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onButtonPress() {
    const { email } = this.props;

    this.props.resetPassword({ email });
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Send Me An Email To Reset My Password
      </Button>
    );
  }

  render() {
      return (
        <View>

          <CardSection>
            <Input
            label="Enter Your Email"
            autoCapitalize={'none'}
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType={'email-address'}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>

        </View>
      );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, error, loading } = auth;

  return { email, error, loading };
};

export default connect(mapStateToProps, { emailChanged, resetPassword })(LoginForm);
*/
