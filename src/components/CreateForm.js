import React, { Component } from 'react';
import { View, Picker, Text, Image, TouchableOpacity, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { BoxShadow } from 'react-native-shadow';
import { entryUpdate } from '../actions';
import CardSection from './common/CardSection';
import InputReform from './common/InputReform';
import InputReform2 from './common/InputReform2';
import PickerCard from './common/PickerCard';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';

class CreateForm extends Component {

  componentWillMount() {
    this.setState({ loading: false });
  }

   openImage() {
    this.setState({ loading: true });
    const imageChangeFail = () => {
      this.setState({ loading: false });
    };
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    //const { uid } = this.state.user
    //const { currentUser } = firebase.auth();
    const item = Date.now() + Math.random();
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
     .catch(imageChangeFail())
    .then(image => {
      const imagePath = image.path;

      let uploadBlob = null;
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
          const { image } = this.props;

          this.props.entryUpdate({ prop: 'image', value: url })
        })

          this.setState({ loading: false });
      });
  }

render() {
  const dpr = this.props.image ?
  (<TouchableOpacity
    style={{
    backgroundColor: 'transparent'
  }}
  >
  <Image
       style={{ width: 80,
       height: 60,
       margin: 5,
       paddingBottom: 5,
       borderRadius: 10
     }}
       source={{ uri: this.props.image }}
  />
  </TouchableOpacity>) :
  (<TouchableOpacity
    onPress={() => this.openImage()}
  >
    <Text
    style={{
      color: '#000',
      alignSelf: 'center',
      }}
    >
      <Icon name="photo-camera" size={45} color="#000" />
    </Text>

    </TouchableOpacity>
);


  const dps = this.state.loading ? <Spinner animating={this.state.loading} /> :
  (
    <View style={styles.container}>


      { dpr }

      </View>
  );


    return (
        <View>
        <CardSection
        style={{ justifyContent: 'center',
        alignSelf: 'center'
       }}
        >
            { dps }
        </CardSection>

        <View>
          <Text style={styles.pickerLabelStyle}>Make</Text>
          <InputReform
            label="Make"
            placeholder="John Deere"
            value={this.props.make}
            onChangeText={value => this.props.entryUpdate({ prop: 'make', value })}
          />

        </View>
        <View>
          <Text style={styles.pickerLabelStyle}>Model</Text>
        <InputReform
          label="Model"
          placeholder="4020"
          value={this.props.model}
          onChangeText={value => this.props.entryUpdate({ prop: 'model', value })}
        />
        </View>
        <View>
          <Text style={styles.pickerLabelStyle}>Price</Text>
        <InputReform
          label="Price"
          placeholder="$50,000"
          value={this.props.price}
          onChangeText={value => this.props.entryUpdate({ prop: 'price', value })}
        />
        </View>


          <View>
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
            prompt={'Pick A Year'}
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
    width: 85,
    height: 65,
    margin: 10,
    borderRadius: 10,
    elevation: 8

  },
};

const mapStateToProps = (state) => {
  const { make, model, year, image, sold, price, miles, description } = state.entryForm;

  return { make, model, year, image, sold, price, miles, description };
};

export default connect(mapStateToProps, { entryUpdate })(CreateForm);
