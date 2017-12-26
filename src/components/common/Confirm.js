import React from 'react';
import { Text, View, Modal } from 'react-native';
import CardSection from './CardSection';
import Card from './Card';
import ButtonReform from './ButtonReform';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <CardSection style={styles.cardSectionStyle}>
          <Text style={styles.textStyle}>{children}</Text>
        </CardSection>
        <CardSection
        style={{ justifyContent: 'center' }}
        >
          <ButtonReform
          style={{ paddingRight: 5 }}
          onPress={onAccept}
          >
            Yes
          </ButtonReform>
          <ButtonReform
          onPress={onDecline}
          >
            No
          </ButtonReform>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 30,
    color: '#fff'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};


export default Confirm;
