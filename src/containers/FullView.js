import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';


class FullView extends Component {
  static propTypes = {
    articleId: PropTypes.number,
    articles: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ScrollView>
        <Text> { this.props.articleId } </Text>
      </ScrollView>
    );
  }

}

function mapStateToProps(state) {
  return {
    articles: state.articles.fetchedArticles,
  };
}

export default connect(mapStateToProps)(FullView);
