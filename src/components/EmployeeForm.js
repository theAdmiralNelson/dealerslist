import React, { Component } from 'react';
import {
  View,
  Picker,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Platform
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import { entryUpdate, loadTrue, loadFalse } from '../actions';
import CardSection from './common/CardSection';
import InputReform from './common/InputReform';
import InputReform2 from './common/InputReform2';
import PickerCard from './common/PickerCard';
import Card from './common/Card';
import Button from './common/Button';
import ButtonReform2 from './common/ButtonReform2';
import Spinner from './common/Spinner';

class EmployeeForm extends Component {


  state = {
    loading: false,
   };

   componentWillMount() {
     this.props.loadFalse();
   }

   openImage() {
     this.setState({ loading: false });
     this.props.loadFalse();
     console.log('yo!');
     const imageChangeFail = () => {
       this.setState({ loading: true });
       this.props.loadTrue();
    };
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    //const { uid } = this.state.user
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    }).catch(imageChangeFail())
    .then(image => {
      const imagePath = image.path;

      let uploadBlob = null;
      const item = Date.now() + Math.random();
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child(item + '.jpg');
      const mime = 'image/jpg';
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          if (url == null || undefined) {
          return this.props.image;
        } else {
          const { image } = this.props;
          this.props.entryUpdate({ prop: 'image', value: url })
          }
        })
        .then(() => {
        this.setState({ loading: false });
        this.props.loadFalse();
      });
    });
  }

  render() {
    const { image } = this.props.employee;
    const dps = this.state.loading ? <Spinner animating={true} /> :
    (<View style={styles.container}>



    <Image
         style={{ width: 80,
           height: 60,
           margin: 5,
           paddingBottom: 5,
           borderRadius: 10
         }}
         source={{ uri: image }}
    />



  </View>);
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 66 }}>
          <View>
            <Text style={styles.switchLabelStyle}>Mark As Sold</Text>
          </View>
          <View style={{ paddingRight: 20 }}>
            <Switch
              tintColor='#a6a7a8'
              onTintColor={Platform.select({
                android: '#41ad41'
              })}
              thumbTintColor={Platform.select({
                android: '#fff'
              })}
              onValueChange={value => this.props.entryUpdate({ prop: 'sold', value })}
              value={this.props.sold}
            />
          </View>
        </View>

        <CardSection
        style={{ justifyContent: 'center',
        alignSelf: 'center'
       }}
        >
          { dps }
        </CardSection>

        <ButtonReform2
        onPress={() => this.openImage()}
        style={styles.buttonStyle}
        >
          <Text style={{ alignSelf: 'center' }}>Change Photo</Text>
          </ButtonReform2>


        <View style={{ marginTop: 0 }}>
        <Text style={styles.pickerLabelStyle}>Make</Text>
          <InputReform
            label="Make"
            placeholder="John Deere"
            value={this.props.make}
            onChangeText={value => this.props.entryUpdate({ prop: 'make', value })}
          />
        </View>

      <View style={{ marginTop: 0 }}>
        <Text style={styles.pickerLabelStyle}>Model</Text>
        <InputReform
          label="Model"
          placeholder="4020"
          value={this.props.model}
          onChangeText={value => this.props.entryUpdate({ prop: 'model', value })}
        />
      </View>


    <View>


      <View>
        <Text style={styles.pickerLabelStyle}>Price</Text>
      <InputReform
        label="Price"
        placeholder="$50,000"
        value={this.props.price}
        onChangeText={value => this.props.entryUpdate({ prop: 'price', value })}
      />
      </View>

            <Text style={styles.pickerLabelStyle}>Mileage/Hours</Text>
          <InputReform2
            label="Miles"
            placeholder="23,000 miles"
            value={this.props.miles}
            onChangeText={value => this.props.entryUpdate({ prop: 'miles', value })}
          />
          </View>

          <View>
            <Text style={styles.pickerLabelStyle}>Description</Text>
          <InputReform2
            label="Description"
            placeholder="Say something about this item..."
            value={this.props.description}
            onChangeText={value => this.props.entryUpdate({ prop: 'description', value })}
          />
          </View>
          <Text style={styles.pickerLabelStyle}>Year</Text>
         <Picker
            itemStyle={{ color: '#6f6f70' }}
            selectedValue={this.props.year}
            onValueChange={value => this.props.entryUpdate({ prop: 'year', value })}
         >
            <Picker.Item label="1950" value="1950" />
            <Picker.Item label="1951" value="1951" />
            <Picker.Item label="1952" value="1952" />
            <Picker.Item label="1953" value="1953" />
            <Picker.Item label="1954" value="1954" />
            <Picker.Item label="1955" value="1955" />
            <Picker.Item label="1956" value="1956" />
            <Picker.Item label="1957" value="1957" />
            <Picker.Item label="1958" value="1958" />
            <Picker.Item label="1959" value="1959" />
            <Picker.Item label="1960" value="1960" />
            <Picker.Item label="1961" value="1961" />
            <Picker.Item label="1962" value="1962" />
            <Picker.Item label="1963" value="1963" />
            <Picker.Item label="1964" value="1964" />
            <Picker.Item label="1965" value="1965" />
          </Picker>



    </View>


    );
  }
}

const styles = {
  switchLabelStyle: {
    fontSize: 14,
    paddingLeft: 20,
    color: '#000'
  },
  buttonTextStyle: {
    fontSize: 8,
    alignSelf: 'center'
  },
  pickerLabelStyle: {
    fontSize: 14,
    marginTop: 20,
    paddingLeft: 20,
    color: '#000'
  },
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 82,
    height: 62,
    margin: 10,
    borderRadius: 10,
    elevation: 20
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = (state) => {
  const { make, model, year, sold, image, price, miles, description, load } = state.entryForm;
  //const { load } = state.loading;

  return { make, model, year, sold, image, price, miles, description, load };
};

export default connect(mapStateToProps, { entryUpdate, loadTrue, loadFalse })(EmployeeForm);
