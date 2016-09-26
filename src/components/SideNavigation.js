import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import SideNavigationMenu from '../components/SideNavigationMenu';


export default class SideNavigation extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    categories: PropTypes.object.isRequired,
    currentView: PropTypes.object.isRequired,
    language: PropTypes.string,
  };

  render() {
    const { isOpen, categories, currentView, language } = this.props;
    const drawerStyles = {
      drawer: {
        backgroundColor: '#403e41'
      }
    }

    return (
      <Drawer
        ref="navigation"
        type="overlay"
        open={isOpen}
        content={
          <SideNavigationMenu
            items={categories.items}
            language={language || 'English'}
            />
        }
        openDrawerOffset={0.18}
        styles={drawerStyles} >

        { currentView }
      </Drawer>
    );
  }
}
