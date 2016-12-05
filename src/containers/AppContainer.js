import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { siteInfoContentID, articlesPerCategory, contentTypes } from '../../ngdemoappconfig';
import { fetchCategories, changeCategory } from '../actions/categories';
import { fetchArticles } from '../actions/articles';
import Header from '../components/Header';
import Navigation from '../components/Navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const appBackgroundColor = '#ef4134';

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
    props.dispatch(fetchCategories(siteInfoContentID));
  }

  componentWillReceiveProps(nextProps) {
    const { articlesCount, dispatch } = nextProps;
    const categories = nextProps.categories.items;
    const numOfCategories = categories.length;

    // If categories have been fetched
    if (numOfCategories && numOfCategories !== this.props.categories.items.length) {
      for (let i = 0; i < numOfCategories; i++) {
        dispatch(fetchArticles(articlesPerCategory, categories[i].locationId, contentTypes));
      }
    }

    if (numOfCategories && numOfCategories === articlesCount) {
      this.setState({ appLoaded: true });
    }
  }

  onPressMenu() {
    this.setState({ menuOpened: !this.state.menuOpened });
  }

  onChangeCategory(category) {
    this.props.dispatch(changeCategory(category));
    this.onPressMenu();
  }

  render() {
    const { categories } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={appBackgroundColor}
          barStyle="light-content"
        />
        <Header
          isMenuOpened={this.state.menuOpened}
          onPressMenu={this.onPressMenu.bind(this)}
        />
        <Navigation
          ref="navigation"
          isOpen={this.state.menuOpened}
          categories={categories.items}
          onChangeCategory={this.onChangeCategory.bind(this)}
        />
        <Spinner
          visible={!this.state.appLoaded}
          overlayColor={appBackgroundColor}
        />
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
