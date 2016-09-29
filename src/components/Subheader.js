import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/Entypo';


const styles = StyleSheet.create({
  subheader: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#e2e3e3',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    color: '#333',
    fontWeight: '500',
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
  },
});

export default class Subheader extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return(
      <View style={styles.subheader}>
        <Text style={styles.title}>
          { this.props.title.toUpperCase() }
        </Text>
      </View>
    );
  }
}
