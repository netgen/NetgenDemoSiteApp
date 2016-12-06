import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  author: {
    color: '#ef4134',
  },
  date: {
    flex: 1,
  },
});

const ArticleMetadata = ({ author, publishDate }) => {
  if (!author && !publishDate) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{ author ? author.fieldValue : null }</Text>
      <Text style={styles.date}>
        { (author && author.fieldValue) ? ' | ' : null }
        { publishDate ? new Date(publishDate.fieldValue.rfc850).toLocaleDateString('hr') : null }
      </Text>
    </View>
  );
};

ArticleMetadata.propTypes = {
  author: PropTypes.object,
  publishDate: PropTypes.object,
};

export default ArticleMetadata;
