import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/articles';
import { View, ScrollView } from 'react-native';
import Subheader from '../components/Subheader';
import ArticlesTiles from '../components/ArticlesTiles';
import ArticlesListView from '../components/ArticlesListView';


class FrontPage extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
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

    return {
      title: 'Most recent',
      listItems: this.sortArticles(allArticles).slice(0, numberOfArticles),
    };
  }

  getArticlesByCategory(activeCategory, numberOfArticles = 10) {
    const { articles, categories } = this.props;
    const { items } = categories;

    return {
      title: items.find(item => item.locationId === activeCategory).name,
      listItems: articles.fetchedArticles[parseInt(activeCategory)],
    };
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
    const { currentlyActive: activeCategory } = this.props.categories;
    const { title, listItems } = !activeCategory
      ? this.getLatestArticles()
      : this.getArticlesByCategory(activeCategory);

    return (
      <View style={{ flex: 1 }}>
        <Subheader
          title={title.toUpperCase()} />
        <ScrollView>
          { !activeCategory ? <ArticlesTiles articles={listItems.splice(0,3)}/> : null }
          { !activeCategory ? <Subheader title='More news' /> : null }
          <ArticlesListView
            articles={listItems} />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    categories: state.categories,
  };
}


export default connect(mapStateToProps)(FrontPage);
