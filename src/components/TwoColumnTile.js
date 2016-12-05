import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 1,
    backgroundColor: '#57595b',
  },
  image: {
    height: 90,
  },
  heading: {
    color: '#fff',
  },
});

const TwoColumnTile = ({ article, onPressArticle, fontStyle }) => (
  <TouchableOpacity
    onPress={() => onPressArticle(article)}
    style={styles.tile}
  >
    <Image
      style={styles.image}
      source={{ uri: article.image }}
    />
    <Text style={[styles.heading, fontStyle]}>
      { article.name.trim() }
    </Text>
  </TouchableOpacity>
);

TwoColumnTile.propTypes = {
  article: PropTypes.object.isRequired,
  onPressArticle: PropTypes.func.isRequired,
  fontStyle: PropTypes.number,
};

export default TwoColumnTile;
