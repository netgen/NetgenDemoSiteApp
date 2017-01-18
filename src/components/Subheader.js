import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


const styles = StyleSheet.create({
  subheader: {
    height: 32,
    backgroundColor: '#e2e3e3',
    justifyContent: 'space-between',
  },
  title: {
    color: '#333',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
  },
  verticalAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftMargin: {
    marginLeft: 5,
  },
  rightMargin: {
    marginRight: 5,
  },
});

export default class Subheader extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPressBackBtn: PropTypes.func,
  };

  renderTitle() {
    return (
      <Text style={[styles.title, { marginLeft: 10 }]}>
        { this.props.title.toUpperCase() }
      </Text>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressBackBtn()}
        style={styles.verticalAlignment}
      >
        <Icon name="chevron-left" size={22} style={styles.leftMargin} />
        <Text style={[styles.title]}>BACK</Text>
      </TouchableOpacity>
    );
  }

  renderShareButton() {
    return (
      <TouchableOpacity>
        <Icon name="share" size={22} style={styles.rightMargin} />
      </TouchableOpacity>
    );
  }

  render() {
    const articleFullView = !this.props.title;

    return (
      <View style={[styles.verticalAlignment, styles.subheader]}>
        { articleFullView ? this.renderBackButton() : this.renderTitle() }
        { (articleFullView && Platform.OS !== 'ios') ? this.renderShareButton() : null }
      </View>
    );
  }
}
