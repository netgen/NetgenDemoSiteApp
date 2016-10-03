import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/Entypo';


const styles = StyleSheet.create({
  subheader: {
    height: 32,
    backgroundColor: '#e2e3e3',
    justifyContent: 'space-between',
  },
  title: {
    color: '#333',
    fontWeight: '500',
    fontSize: 10,
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
    onPressBackBtn: PropTypes.func,
  };

  render() {
    const fullView = !this.props.title;

    return (
      <View style={[styles.verticalAlignment, styles.subheader]}>
        { fullView ? this._renderBackButton() : this._renderTitle() }
        { fullView ? this._renderShareButton() : null }
      </View>
    );
  }

  _renderTitle() {
    return (
      <Text style={[styles.title, styles.leftMargin]}>
        { this.props.title.toUpperCase() }
      </Text>
    );
  }

  _renderBackButton() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressBackBtn()}
        style={styles.verticalAlignment} >
        <Icon name='chevron-left'  size={12} style={styles.leftMargin} />
        <Text style={[styles.title]}>BACK</Text>
      </TouchableOpacity>
    );
  }

  _renderShareButton() {
    return (
      <TouchableOpacity>
        <Icon name='share' size={12} style={styles.rightMargin} />
      </TouchableOpacity>
    );
  }
}
