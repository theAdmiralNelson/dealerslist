import React, { Component } from 'react';
import { View, Picker, Text, Image, TouchableOpacity, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { entryUpdate } from '../actions';
import CardSection from './common/CardSection';
import InputReform from './common/InputReform';
import InputReform2 from './common/InputReform2';
import Spinner from './common/Spinner';

class CreateForm extends Component {

  componentWillMount() {
    this.setState({ loading: false });
  }

   openImage() {
    this.setState({ loading: false });
    const imageChangeFail = () => {
      this.setState({ loading: false });
    };
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
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


  const dps = this.state.loading ? <Spinner animating={'true'} /> :
  (
    <View style={styles.container}>


      { dpr }

      </View>
  );


    return (
        <View>
        <CardSection
          style={{
            justifyContent: 'center',
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
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2010" value="2010" />
            <Picker.Item label="2009" value="2009" />
            <Picker.Item label="2008" value="2008" />
            <Picker.Item label="2007" value="2007" />
            <Picker.Item label="2006" value="2006" />
            <Picker.Item label="2005" value="2005" />
            <Picker.Item label="2004" value="2004" />
            <Picker.Item label="2003" value="2003" />
            <Picker.Item label="2002" value="2002" />
            <Picker.Item label="2001" value="2001" />
            <Picker.Item label="1999" value="1999" />
            <Picker.Item label="1998" value="1998" />
            <Picker.Item label="1997" value="1997" />
            <Picker.Item label="1996" value="1996" />
            <Picker.Item label="1995" value="1995" />
            <Picker.Item label="1994" value="1994" />
            <Picker.Item label="1993" value="1993" />
            <Picker.Item label="1992" value="1992" />
            <Picker.Item label="1991" value="1991" />
            <Picker.Item label="1990" value="1990" />
            <Picker.Item label="1989" value="1989" />
            <Picker.Item label="1988" value="1988" />
            <Picker.Item label="1987" value="1987" />
            <Picker.Item label="1986" value="1986" />
            <Picker.Item label="1985" value="1985" />
            <Picker.Item label="1984" value="1984" />
            <Picker.Item label="1983" value="1983" />
            <Picker.Item label="1982" value="1982" />
            <Picker.Item label="1981" value="1981" />
            <Picker.Item label="1980" value="1980" />
            <Picker.Item label="1979" value="1979" />
            <Picker.Item label="1978" value="1977" />
            <Picker.Item label="1976" value="1976" />
            <Picker.Item label="1975" value="1975" />
            <Picker.Item label="1974" value="1974" />
            <Picker.Item label="1973" value="1973" />
            <Picker.Item label="1972" value="1972" />
            <Picker.Item label="1971" value="1971" />
            <Picker.Item label="1970" value="1970" />
            <Picker.Item label="1969" value="1969" />
            <Picker.Item label="1968" value="1968" />
            <Picker.Item label="1967" value="1967" />
            <Picker.Item label="1966" value="1966" />
            <Picker.Item label="1965" value="1965" />
            <Picker.Item label="1964" value="1964" />
            <Picker.Item label="1963" value="1963" />
            <Picker.Item label="1962" value="1962" />
            <Picker.Item label="1961" value="1961" />
            <Picker.Item label="1960" value="1960" />
            <Picker.Item label="1959" value="1959" />
            <Picker.Item label="1958" value="1958" />
            <Picker.Item label="1957" value="1957" />
            <Picker.Item label="1956" value="1956" />
            <Picker.Item label="1955" value="1955" />
            <Picker.Item label="1954" value="1954" />
            <Picker.Item label="1953" value="1953" />
            <Picker.Item label="1952" value="1952" />
            <Picker.Item label="1951" value="1951" />
            <Picker.Item label="1950" value="1950" />
            <Picker.Item label="1949" value="1949" />
            <Picker.Item label="1948" value="1948" />
            <Picker.Item label="1947" value="1947" />
            <Picker.Item label="1946" value="1946" />
            <Picker.Item label="1945" value="1945" />
            <Picker.Item label="1944" value="1944" />
            <Picker.Item label="1943" value="1943" />
            <Picker.Item label="1942" value="1942" />
            <Picker.Item label="1941" value="1941" />
            <Picker.Item label="1940" value="1940" />
            <Picker.Item label="1939" value="1939" />
            <Picker.Item label="1938" value="1938" />
            <Picker.Item label="1937" value="1937" />
            <Picker.Item label="1936" value="1936" />
            <Picker.Item label="1935" value="1935" />
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
