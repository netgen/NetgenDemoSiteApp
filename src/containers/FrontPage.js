import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/articles';
import ArticlesListView from '../components/ArticlesListView';


class FrontPage extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    category: PropTypes.string,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  /* On category change update articles
  componentWillReceiveProps(nextProps) {
    const { category, dispatch } = this.props;
    if (nextProps.category !== category) {
      dispatch(fetchArticles(10)); // TODO: Add category to params
    }
  }*/

  componentDidMount() {
    if (this.props.category) { this.setState({ shouldUpdate: true }) }
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
    const { articles, category } = this.props;

    return articles.fetchedArticles[parseInt(category)];
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
    const { category } = this.props;

    const articlesListItems = !category
      ? this.getLatestArticles()
      : this.getArticlesByCategory();

    return (
      <ArticlesListView
        articles={articlesListItems}
        shouldUpdate={!!this.state.shouldUpdate} />
    );
  }
}

function mapStateToProps(state) {
  return { articles: state.articles };
}


export default connect(mapStateToProps)(FrontPage);
