import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import SideNavigationMenu from './SideNavigationMenu';
import { Navigator } from 'react-native';
import FrontPage from '../containers/FrontPage';
import FullView from '../containers/FullView';


export default class SideNavigation extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    language: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { isMenuOpened: false };
  }

  render() {
    const { isOpen, categories, onChangeCategory, language } = this.props;
    const drawerStyles = {
      drawer: {
        backgroundColor: '#403e41'
      }
    }

    return (
      <Drawer
        ref="sideNav"
        type="overlay"
        open={isOpen}
        content={
          <SideNavigationMenu
            items={categories}
            changeCategory={(category) => {
              this.refs.navigator.popToTop();
              onChangeCategory(category);
            }}
            language={language || 'English'} />
        }
        openDrawerOffset={0.18}
        styles={drawerStyles} >

        <Navigator
          ref="navigator"
          initialRoute={{ name: 'Articles list', index: 0 }}
          renderScene={this.renderScene}
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FadeAndroid} />

      </Drawer>
    );
  }

  renderScene(route, navigator) {
    if (route.articleId) {
      return (
        <FullView
          articleId={route.articleId}
          navigator={navigator} />
      );
    }
    else {
      return (
        <FrontPage
          navigator={navigator} />
      );
    }
  }
}
