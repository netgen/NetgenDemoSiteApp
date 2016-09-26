import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet } from 'react-native';
import SideNavigationItem from './SideNavigationItem';


const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontWeight: '500',
    marginRight: 20,
  },
});

export default class SideNavigationMenu extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    language: PropTypes.string,
  };

  render() {
    const { items, language } = this.props;

    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}> {language} </Text>
        </View>
        { this._renderItems(items) }
      </View>
    );
  }

  _renderItems(items) {
    return items.map((item, index) => (
            <SideNavigationItem
              key={item.mainLocation}
              item={item.name} />
          ));
  }
}
