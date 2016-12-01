import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import Subheader from '../components/Subheader';
import ArticlesTiles from '../components/ArticlesTiles';
import ArticlesList from '../components/ArticlesList';


class HomeScreen extends Component {
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

  onPressArticle(article) {
    this.props.navigator.push({ name: 'Article full view', article, index: 1 });
  }

  getLatestArticles(numberOfArticles = 10) {
    const { fetchedArticles } = this.props.articles;
    let allArticles = [];

    for (const category in fetchedArticles) {
      if ({}.hasOwnProperty.call(fetchedArticles, category)) {
        allArticles = allArticles.concat(fetchedArticles[category]);
      }
    }

    return {
      title: 'Most recent',
      listItems: this.sortArticles(allArticles).slice(0, numberOfArticles),
    };
  }

  getArticlesByCategory(activeCategory) {
    const { articles, categories } = this.props;
    const { items } = categories;

    return {
      title: items.find(item => item.locationId === activeCategory).name,
      listItems: articles.fetchedArticles[parseInt(activeCategory, 10)],
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
          title={title.toUpperCase()}
        />
        <ScrollView>
          { !activeCategory &&
            <ArticlesTiles
              articles={listItems.splice(0, 3)}
              onPressArticle={this.onPressArticle.bind(this)}
            />
          }
          { !activeCategory && <Subheader title="More news" /> }
          <ArticlesList
            articles={listItems}
            onPressArticle={this.onPressArticle.bind(this)}
          />
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


export default connect(mapStateToProps)(HomeScreen);
