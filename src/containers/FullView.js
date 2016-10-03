import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView } from 'react-native';
import Subheader from '../components/Subheader';


class FullView extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    articles: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  onPressBackBtn() {
    this.props.navigator.pop();
  }

  render() {
    const { article } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Subheader
          onPressBackBtn={this.onPressBackBtn.bind(this)} />
        <ScrollView>
          <Text> { article.content._id } </Text>
        </ScrollView>
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {
    articles: state.articles.fetchedArticles,
  };
}

export default connect(mapStateToProps)(FullView);
