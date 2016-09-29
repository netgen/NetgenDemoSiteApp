import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, changeCategory } from '../actions/categories';
import { fetchArticles } from '../actions/articles';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/Header';
import Navigation from '../components/Navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AppContainer extends Component {
  static propTypes = {
    articlesCount: PropTypes.number.isRequired,
    categories: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      appLoaded: false,
      menuOpened: false,
    };
    props.dispatch(fetchCategories(63));
  }

  componentWillReceiveProps(nextProps) {
    const { articlesCount, dispatch } = nextProps;
    const categories = nextProps.categories.items;
    const numOfCategories = categories.length;

    // If categories have been fetched
    if (numOfCategories && numOfCategories !== this.props.categories.items.length) {
      for (let i = 0; i < numOfCategories; i++) {
        dispatch(fetchArticles(10, categories[i].locationId));
      }
    }

    if (numOfCategories && numOfCategories === articlesCount) {
      this.setState({ appLoaded: true });
    }
  }

  _onPressMenu() {
    this.setState({ menuOpened: !this.state.menuOpened });
  }

  _onChangeCategory(category) {
    this.props.dispatch(changeCategory(category));
    this._onPressMenu();
  }

  render() {
    const { categories } = this.props;

    return (
      <View style={styles.container}>
        <Header
          isMenuOpened={this.state.menuOpened}
          onPressMenu={this._onPressMenu.bind(this)} />
        <Spinner
          visible={!this.state.appLoaded}
          overlayColor="#ef4134" />
        <Navigation
          ref="navigation"
          isOpen={this.state.menuOpened}
          categories={categories.items}
          onChangeCategory={this._onChangeCategory.bind(this)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    articlesCount: Object.keys(state.articles.fetchedArticles).length,
    categories: state.categories,
  };
}


export default connect(mapStateToProps)(AppContainer);
