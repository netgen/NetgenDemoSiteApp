import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const netgenLogo = require('../../assets/logo_simple_2.png');

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#ef4134',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    margin: 5,
  },
  centerItem: {
    height: 30,
    width: 85,
  },
});

export default class Header extends Component {
  static propTypes = {
    isMenuOpened: PropTypes.bool.isRequired,
    onPressMenu: PropTypes.func.isRequired,
    onSearchPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isMenuOpened, onPressMenu } = this.props;
    const leftIcon = isMenuOpened ? 'cross' : 'menu';

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onPressMenu()}>
          <Icon
            name={leftIcon}
            size={30}
            color="#fff"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Image
          style={styles.centerItem}
          source={netgenLogo}
        />
        <Icon
          name="magnifying-glass"
          size={25}
          color="#fff"
          style={styles.headerIcon}
        />
      </View>
    );
  }
}
