import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/Entypo';


const styles = StyleSheet.create({
  subheader: {
    height: 40,
    backgroundColor: '#e2e3e3',
    justifyContent: 'space-between',
  },
  title: {
    color: '#333',
    fontWeight: '500',
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
  },
  verticalAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftMargin: {
    marginLeft: 10,
  },
  rightMargin: {
    marginRight: 10,
  },
});

export default class Subheader extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    const fullView = !this.props.title;
    const leftMargin = fullView ? {} : styles.leftMargin;

    return (
      <View style={[styles.verticalAlignment, styles.subheader]}>
        <View style={styles.verticalAlignment}>
          { fullView ? this._renderBackButton() : null }
          <Text style={[styles.title, leftMargin]}>
            { this.props.title || 'BACK' }
          </Text>
        </View>
        <View>
          { fullView ? this._renderShareButton() : null }
        </View>
      </View>
    );
  }

  _renderBackButton() {
    return (
      <Icon name='chevron-left'  size={20} style={styles.leftMargin} />
    );
  }

  _renderShareButton() {
    return (
      <Icon name='share' size={18} style={styles.rightMargin} />
    );
  }
}
