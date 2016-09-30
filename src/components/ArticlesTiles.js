import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Platform, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  fullScreenWidthImage: {
    alignSelf: 'stretch',
    height: 180,
    flexDirection: 'row',
  },
  heading: {
    backgroundColor: '#ef4134',
    color: '#fff',
    fontSize: 20,
    alignSelf: 'flex-end',
    flex: 1,
    flexWrap: 'wrap',
  },
  font: {
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
    fontWeight: '500',
    margin: 10,
  },
  twoColumnContainer: {
    flex: 1,
    margin: 1,
    backgroundColor: '#57595b',
  },
});

export default class ArticlesTiles extends Component {
  static propTypes: {
    articles: PropTypes.array.isRequired,
  };

  /* TODO: In future consider making separate component for full screen tile
    and two column tiles
  */
  render() {
    const { articles } = this.props;
    const [
      fullScreenTiles,
      twoColumnTiles
    ] = [ articles.slice(0,1), articles.slice(1) ];

    return (
      <View>
        { fullScreenTiles.map(article => this._renderFullScreenTile(article)) }
        <View style={{ flexDirection: 'row' }}>
          { twoColumnTiles.map(article => this._renderTwoColumnTiles(article)) }
        </View>
      </View>
    );
  }

  _renderFullScreenTile(article) {
    return (
      <View key={article.content._id}>
        <Image
          style={styles.fullScreenWidthImage}
          source={{ uri: article.image }} >
          <Text style={[styles.heading, styles.font]}>
            { article.name.trim() }
          </Text>
        </Image>
      </View>
    );
  }

  _renderTwoColumnTiles(article) {
    return (
      <View key={article.content._id} style={styles.twoColumnContainer}>
        <Image
          style={{ height: 90 }}
          source={{ uri: article.image }} />
        <Text style={[styles.font, { color: '#fff' }]}>
          { article.name.trim() }
        </Text>
      </View>
    );
  }
}
