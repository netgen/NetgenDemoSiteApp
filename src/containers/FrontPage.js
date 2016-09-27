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
  }

  componentWillMount() {
    this.props.dispatch(fetchArticles(10));
  }

  /* On category change update articles
  componentWillReceiveProps(nextProps) {
    const { category, dispatch } = this.props;
    if (nextProps.category !== category) {
      dispatch(fetchArticles(10)); // TODO: Add category to params
    }
  }*/

  render() {
    const { articles } = this.props;

    // TODO: Later should pass only articles of selected category
    // If no category, pick first N of all categories
    return (
      <ArticlesListView
        articles={articles.fetchedArticles} />
    );
  }
}

function mapStateToProps(state) {
  return { articles: state.articles };
}


export default connect(mapStateToProps)(FrontPage);
