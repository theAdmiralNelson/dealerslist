import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardSection from './common/CardSection';
import SliderEntry from './SliderEntry';


export default class ListItem extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    //const { make } = this.props.employee;
    //const { model } = this.props.employee;
    //const { image } = this.props.employee;

    return (
      <View style={{ elevation: 5 }}>
        <SliderEntry style={{ elevation: 5 }} />
      </View>
    /*  <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Image
               style={{ width: 80, height: 60, margin: 5 }}
               source={{ uri: image }}
            />
            <Text style={styles.titleStyle}>
              {make} {model}
            </Text>
          </CardSection>
        </View>
      </TouchableOpacity>*/
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};
