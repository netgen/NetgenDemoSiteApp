import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';


const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#57595b',
    margin: 0.5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
    marginLeft: 10,
  },
});

export default class SideNavigationItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    changeCategory: PropTypes.func.isRequired,
  };

  render() {
    const { item, changeCategory } = this.props;

    return (
      <TouchableOpacity onPress={() => changeCategory(item.locationId)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            { item.name.toUpperCase() }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
