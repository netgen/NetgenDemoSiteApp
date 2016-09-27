import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
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
    articles: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentWillReceiveProps(nextProps) {
    const data = this._generateArticleRows(nextProps);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource || []}
        enableEmptySections={true}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator} />
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: rowData.image }}></Image>
        <Text style={styles.text}>
          {rowData.title}
        </Text>
      </View>
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

  _generateArticleRows(props) {
    const { articles } = props;
    const rowData = [];

    for (let article in articles) {
      rowData.push({ title: article, image: articles[article].image });
    }

    return rowData;
  }
}
