import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';
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
  }

  componentWillReceiveProps(nextProps) {
    const articles = nextProps.articles.fetchedArticles;
    const categories = nextProps.categories.items;

    if (Object.keys(articles).length && categories.length) {
      this.setState({ appLoaded: true });
    }
  }

  _onPressMenu() {
    this.setState({ menuOpened: !this.state.menuOpened });
  }

  render() {
    const { articles, categories } = this.props;

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
          onPressMenu={this._onPressMenu.bind(this)}
          categories={categories.items} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(AppContainer);
