import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Navigator } from 'react-native';
import SideNavigationMenu from './SideNavigationMenu';
import HomeScreen from '../containers/HomeScreen';
import ArticleScreen from '../containers/ArticleScreen';


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

  renderScene(route, navigator) {
    if (route.article) {
      return (
        <ArticleScreen
          article={route.article}
          navigator={navigator}
        />
      );
    }
    return (
      <HomeScreen
        navigator={navigator}
      />
    );
  }

  render() {
    const { isOpen, categories, onChangeCategory, language } = this.props;
    const drawerStyles = {
      drawer: {
        backgroundColor: '#403e41',
      },
    };

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
            language={language || 'English'}
          />
        }
        openDrawerOffset={0.18}
        styles={drawerStyles}
      >

        <Navigator
          ref="navigator"
          initialRoute={{ name: 'Articles list', index: 0 }}
          renderScene={this.renderScene}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        />

      </Drawer>
    );
  }
}
