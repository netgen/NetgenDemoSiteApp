import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform } from 'react-native';
import SideNavigationItem from './SideNavigationItem';


const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 20,
  },
});

export default class SideNavigationMenu extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    changeCategory: PropTypes.func.isRequired,
    language: PropTypes.string,
  };

  renderItems(items) {
    return items.map((item) => (
      <SideNavigationItem
        key={`category ${item.locationId || 'all'}`}
        item={item}
        changeCategory={this.props.changeCategory}
      />
    ));
  }

  render() {
    const { items, language } = this.props;
    const homeMenuItem = [{ locationId: '', name: 'Home' }];
    const menuItems = homeMenuItem.concat(items);

    return (
      <View>
        <View style={styles.headerContainer}>
          {Platform.OS !== 'ios' &&
            <Text style={styles.header}> {language} </Text>
          }
        </View>
        { this.renderItems(menuItems) }
      </View>
    );
  }
}
