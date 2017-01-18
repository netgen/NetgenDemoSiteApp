import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Linking,
  WebView } from 'react-native';
import Subheader from '../components/Subheader';
import ArticleMetadata from '../components/ArticleMetadata';
import { replaceXmlTagsWithHtml } from '../utils/helper';


const heightScript = {
  ios: '(document.height !== undefined) ? document.height : document.body.offsetHeight;',
  android: `<script>
    document.title = (document.height !== undefined) ? document.height : document.body.offsetHeight;
  </script>
  `,
};

const webviewStyle = `<style>
  body {
    font-family: Sans-Serif;
  }
  a {
    color: #ef4134;
  }
</style>`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenWidthImage: {
    height: 200,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
  },
});

class ArticleScreen extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { height: 100 };
  }

  onPressBackBtn() {
    this.props.navigator.pop();
  }

  /*
    iOS specific method.
    Return value defines whether WebView should try to load the source inside the app.
  */
  onShouldStartLoadWithRequest(navState) {
    if (this.isExternalUrl(navState.url)) {
      this.openExternalLink(navState.url);
      return false;
    }

    return true;
  }

  /*
    Handles height change.
    Also, handles opening external link in browser for Androids.
  */
  onNavigationStateChange(navState) {
    const isIOS = (Platform.OS === 'ios');
    const height = isIOS ? Number(navState.jsEvaluationValue) : Number(navState.title);

    if (this.isExternalUrl(navState.url)) {
      !isIOS && this.openExternalLink(navState.url);
      return;
    }

    if (height && height !== this.state.height) {
      this.setState({ height });
    }
  }

  openExternalLink(url) {
    this.refs.Webview.stopLoading();
    Linking.openURL(url);
  }

  isExternalUrl(url) {
    return (url.startsWith('http://') || url.startsWith('https://'));
  }

  articleContent(fieldIdentifier) {
    const articleContentFields = this.props.article.content.CurrentVersion.Version.Fields.field;
    return articleContentFields.find(field =>
      (field.fieldDefinitionIdentifier === fieldIdentifier)
    );
  }

  filteredArticleBody() {
    const articleBody = this.articleContent('body');

    if (!articleBody) return '';

    return articleBody.fieldValue.xml
      .replace(/<\/?(?:(?!bold|italic|break|link|paragraph|header).)*?\/?>/ig, '')
      .replace(/(<\/?)([a-z]*)/ig, replaceXmlTagsWithHtml)
      .replace(/(url)(=)/ig, 'href$2');
  }

  /*
    Note: Script that reinitialize webviews height had to be put customly in html
    for Androids, because jsEvaluationValue property does not exist in navigation state.
  */
  renderWebViewContent(customHtml) {
    const webviewHtml = customHtml + (Platform.OS === 'android' ? heightScript.android : '');

    return (
      <WebView
        ref="Webview"
        source={{
          html:
          `<!DOCTYPE html>\n
            <html>
              <head> ${webviewStyle} </head>
              <body> ${webviewHtml} </body>
            </html>`,
        }}
        style={{ marginLeft: 3, height: Number(this.state.height) + 30 }}
        scrollEnabled={false}
        startInLoadingState={false}
        javaScriptEnabled
        injectedJavaScript={Platform.OS === 'ios' ? heightScript.ios : ''}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }

  render() {
    const { article } = this.props;
    const customHtml = this.filteredArticleBody();

    return (
      <View style={styles.container}>
        <Subheader
          onPressBackBtn={this.onPressBackBtn.bind(this)}
        />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>{ article.name.trim() }</Text>
            <ArticleMetadata
              author={this.articleContent('author_override')}
              publishDate={this.articleContent('publish_date')}
            />
          </View>
          <Image
            source={{ uri: article.image }}
            style={styles.fullScreenWidthImage}
          />
          { !!customHtml && this.renderWebViewContent(customHtml) }
        </ScrollView>
      </View>
    );
  }
}

export default ArticleScreen;
