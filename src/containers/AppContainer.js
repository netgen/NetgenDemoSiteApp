/*
  App main screen container
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles, fetchArticleByID } from '../actions/articles';
import { fetchCategories } from '../actions/categories';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/Header';
import SideNavigation from '../components/SideNavigation';
import ArticlesListView from '../components/ArticlesListView';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AppContainer extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      appLoaded: false,
      menuOpened: false,
    };
    this.props.dispatch(fetchCategories(63));
    this.props.dispatch(fetchArticles(10));
  }

  componentWillReceiveProps(nextProps) {
    const articles = nextProps.articles.fetchedArticles;
    const categories = nextProps.categories.items;

    if (Object.keys(articles).length && categories.length) {
      this.setState({ appLoaded: true });
    }
  }

  _fetchArticleByID(articleID = 372) {
    const { dispatch } = this.props;
    dispatch(fetchArticleByID(articleID));
  }

  _fetchArticles(numberOfArticles, category) {
    const { dispatch } = this.props;
    dispatch(fetchArticles(numberOfArticles, category));
  }

  _onPressMenu() {
    this.setState({ menuOpened: !this.state.menuOpened });
  }

  render() {
    const { articles, categories } = this.props;
    const articlesList =
          <ArticlesListView
              articles={this.props.articles.fetchedArticles}
              fetchArticles={this._fetchArticles.bind(this)} />;

    return (
      <View style={styles.container}>
        <Header
          isMenuOpened={this.state.menuOpened}
          onPressMenu={this._onPressMenu.bind(this)} />
        <Spinner
          visible={!this.state.appLoaded}
          overlayColor="#ef4134" />
        <SideNavigation
          isOpen={this.state.menuOpened}
          categories={categories}
          currentView={articlesList} >
        </SideNavigation>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(AppContainer);
