import React from 'react-native';

const {
  View,
  Text,
  StyleSheet,
  ActivityIndicatorIOS,
} = React;

const styles = StyleSheet.create({
  loading: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class LoadingView extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large' />
        <Text>Loading notes...</Text>
      </View>
    );
  }
}

export default LoadingView;
