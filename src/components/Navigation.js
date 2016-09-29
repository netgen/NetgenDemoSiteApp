import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import SideNavigationMenu from './SideNavigationMenu';
import { Navigator } from 'react-native';
import FrontPage from '../containers/FrontPage';


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

  navigate(route) {
    this.refs.navigator.push(route);
    // this.props.onPressMenu();
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
            changeCategory={onChangeCategory}
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
    if (route.articleName) {
      return null; // TODO: Should be replaced with article full view component
    }
    else {
      return (
        <FrontPage
          navigator={navigator} />
      );
    }
  }
}
