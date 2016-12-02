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


export default class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    onPressArticle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.articles;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity onPress={() => this.props.onPressArticle(rowData)}>
        <View style={styles.row}>
          {
            rowData.image !== undefined &&
              <Image key={rowData.image} style={styles.image} source={{ uri: rowData.image }} />
          }
          <Text style={styles.text}>
            {rowData.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}
