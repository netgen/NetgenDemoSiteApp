/*
  App main screen container
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles, fetchArticleByID } from '../actions/articles';
import ArticlesListView from '../components/ArticlesListView';

class Main extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    category: PropTypes.string, // Probably the same component will be used for every news category
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _fetchArticleByID(articleID = 372) {
    const { dispatch } = this.props;
    dispatch(fetchArticleByID(articleID));
  }

  _fetchArticles(numberOfArticles, category) {
    const { dispatch } = this.props;
    dispatch(fetchArticles(numberOfArticles, category));
  }

  render() {
    return (
      <ArticlesListView
        articles={this.props.articles.fetchedArticles}
        fetchArticles={this._fetchArticles.bind(this)} />
    );
  }
}

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(Main);
