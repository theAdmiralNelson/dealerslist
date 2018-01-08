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
     this.setState({ loading: true });
     this.props.loadFalse();
     console.log('yo!');
     const imageChangeFail = () => {
       this.setState({ loading: false });
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

        <Text
          style={{
            fontSize: 8,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingBottom: 10
          }}
        >
          Image changes will not appear until saved
        </Text>

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
         <Picker.Item label="1969" value="1959" />
         <Picker.Item label="1968" value="1958" />
         <Picker.Item label="1967" value="1957" />
         <Picker.Item label="1966" value="1956" />
         <Picker.Item label="1965" value="1955" />
         <Picker.Item label="1964" value="1954" />
         <Picker.Item label="1963" value="1953" />
         <Picker.Item label="1962" value="1952" />
         <Picker.Item label="1961" value="1951" />
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
