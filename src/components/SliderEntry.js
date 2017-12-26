import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {


    static propTypes = {
        //data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    onRowPress() {
      Actions.employeeEdit({ employee: this.props.employee });
    }


    get image() {
        const { parallax, parallaxProps, even } = this.props;
        const { image } = this.props.employee;

        return parallax ? (
            <ParallaxImage
              source={{ uri: image }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
        );
    }


    render() {
        const { even } = this.props;
        const { make } = this.props.employee;
        const { model } = this.props.employee;


        const uppercaseTitle = make ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { make.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={this.onRowPress.bind(this)}
              >

                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { model }
                    </Text>
              
                </View>

            </TouchableOpacity>
        );
    }
}
