import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/articles';
import ArticlesListView from '../components/ArticlesListView';


class FrontPage extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    activeCategory: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getLatestArticles(numberOfArticles = 10) {
    const { articles } = this.props;
    let allArticles = [];

    for (category in articles.fetchedArticles) {
      allArticles = allArticles.concat(articles.fetchedArticles[category]);
    }

    return this.sortArticles(allArticles).slice(0,numberOfArticles);
  }

  getArticlesByCategory(numberOfArticles = 10) {
    const { articles, activeCategory } = this.props;

    return articles.fetchedArticles[parseInt(activeCategory)];
  }

  sortArticles(articles) {
    return articles.sort((a, b) => {
      if (a.content.publishedDate > b.content.publishedDate) {
        return -1;
      }
      if (a.content.publishedDate < b.content.publishedDate) {
        return 1;
      }
      return 0;
    });
  }

  render() {
    const { activeCategory } = this.props;
    const articlesListItems = !activeCategory
      ? this.getLatestArticles()
      : this.getArticlesByCategory();

    return (
      <ArticlesListView
        articles={articlesListItems} />
    );
  }
}

function mapStateToProps(state) {
  return { articles: state.articles,
    activeCategory: state.categories.currentlyActive };
}


export default connect(mapStateToProps)(FrontPage);
