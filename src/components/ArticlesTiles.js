import React, { PropTypes } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import SingleColumnTile from './SingleColumnTile';
import TwoColumnTile from './TwoColumnTile';

const styles = StyleSheet.create({
  font: {
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
    fontWeight: '500',
    margin: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

const ArticlesTiles = ({ articles, onPressArticle }) => {
  const [
    fullScreenTiles,
    twoColumnTiles,
  ] = [articles.slice(0, 1), articles.slice(1)];

  return (
    <View>
      {
        fullScreenTiles.map(article => (
          <SingleColumnTile
            key={article.content._id}
            article={article}
            onPressArticle={onPressArticle}
            fontStyle={styles.font}
          />
        ))
      }
      <View style={styles.flexRow}>
        {
          twoColumnTiles.map(article => (
            <TwoColumnTile
              key={article.content._id}
              article={article}
              onPressArticle={onPressArticle}
              fontStyle={styles.font}
            />
          ))
        }
      </View>
    </View>
  );
};

ArticlesTiles.propTypes = {
  articles: PropTypes.array.isRequired,
  onPressArticle: PropTypes.func.isRequired,
};

export default ArticlesTiles;
