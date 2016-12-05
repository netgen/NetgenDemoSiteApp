import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

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
});

const SingleColumnTile = ({ article, onPressArticle, fontStyle }) => (
  <TouchableOpacity
    key={article.content._id}
    onPress={() => onPressArticle(article)}
  >
    <Image
      style={styles.fullScreenWidthImage}
      source={{ uri: article.image }}
    >
      <Text style={[styles.heading, fontStyle]}>
        { article.name.trim() }
      </Text>
    </Image>
  </TouchableOpacity>
);

SingleColumnTile.propTypes = {
  article: PropTypes.object.isRequired,
  onPressArticle: PropTypes.func.isRequired,
  fontStyle: PropTypes.number,
};

export default SingleColumnTile;
