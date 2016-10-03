import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView } from 'react-native';


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  image: {
    width: 100,
    height: 56,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontWeight: '500',
  },
});


export default class ArticlesListView extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    onPressArticle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.articles;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator} />
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={() => this.props.onPressArticle(rowData)}>
        <View style={styles.row}>
          <Image style={styles.image} source={{ uri: rowData.image }}></Image>
          <Text style={styles.text}>
            {rowData.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#CCCCCC',
        }}
      />
    );
  }
}
