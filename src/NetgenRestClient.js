/* Simple wrapper around eZ platform REST API for fetching content */


export default class NetgenRestClient {
  constructor(props) {
    this.endPointUrl = props.endPointUrl;
    this.apiPath = props.apiPath || '/api/ezp/v2/';
    this.acceptHeader = props.acceptHeader || 'application/vnd.ez.api.';
  }

  async getArticles(numberOfItems, parentLocationID, contentTypes, imageVariation) {
    const { View: response } = await this._fetchArticles(numberOfItems, parentLocationID, contentTypes);
    const articles = response.Result.searchHits.searchHit.map(result => result.value.Content);
    const images = await this.getArticlesImageUrls(articles, imageVariation);

    return articles.map((article, index) => ({
      name: article.Name,
      content: article,
      image: images[index],
    }));
  }

  async getArticleByID(objectID, imageVariation) {
    if (!objectID) throw new Error('Object ID not defined');

    const { Content: article } = await this._fetchObjectByID(objectID);
    const image = await this.getArticleImageUrl(article, imageVariation);

    return {
      [article.Name]: {
        content: article,
        image,
      },
    };
  }

  getArticlesImageUrls(articles, variation = 'i320') {
    const imagePromises = articles.map((article) => {
      return this.getArticleImageUrl(article, variation);
    }, this);

    return Promise.all(imagePromises);
  }

  async getArticleImageUrl(article, variation) {
    const articleFields = article.CurrentVersion.Version.Fields.field;
    const imageField = articleFields.find(el => el.fieldDefinitionIdentifier === 'image');

    if (!imageField || !imageField.fieldValue) return;

    const imageUri = imageField.fieldValue.uri;
    const imageVariation = imageField.fieldValue.variations[variation];

    let imageVariationUri = '';
    if (imageVariation && imageVariation.href) {
      const { ContentImageVariation } = await this._fetchImageVariationUri(imageVariation.href);
      imageVariationUri = ContentImageVariation.uri;
    }

    return `${this.endPointUrl}${imageVariationUri || imageUri}`;
  }

  async getCategories(siteInfoContentID) {
    if (!siteInfoContentID) throw new Error('Site info content ID not provided');

    const { Content: siteInfo } = await this._fetchObjectByID(siteInfoContentID);
    const mainMenuItems = siteInfo.CurrentVersion.Version.Fields.field.find(el => el.fieldDefinitionIdentifier === 'main_menu').fieldValue;
    const categories = await this._fetchCategories(mainMenuItems.destinationContentIds);

    return categories.map(category => ({
      name: category.Content.Name,
      locationId: /[^/]*$/.exec(category.Content.MainLocation._href)[0], // Grabs string after last dash
      mainLocation: category.Content.MainLocation._href,
    }));
  }

  async _fetchArticles(numberOfItems = 10, parentLocationID, contentTypes = ['ng_news', 'ng_article', 'ng_blog_post', 'ng_video']) {
    const requestUrl = `${this.endPointUrl}${this.apiPath}views`;
    const criterionObject = parentLocationID ? { SubtreeCriterion: `/1/2/${parentLocationID}/` } : {};
    const contentTypeCriterion = this._buildContentTypeCriterion(contentTypes.slice(), criterionObject);

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: `${this.acceptHeader}View+json; version=1.1`,
        'Content-Type': `${this.acceptHeader}ViewInput+json; version=1.1`,
      },
      body: JSON.stringify({
        ViewInput: {
          identifier: 'fetch_articles_view',
          ContentQuery: {
            Criteria: contentTypeCriterion,
            limit: numberOfItems,
            offset: '0',
            SortClauses: { DatePublished: 'descending' },
          },
        },
      }),
    });

    return response.json();
  }

  async _fetchObjectByID(objectContentID) {
    const requestUrl = `${this.endPointUrl}${this.apiPath}content/objects/${objectContentID}`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Accept: `${this.acceptHeader}Content+json`,
      },
    });

    return response.json();
  }

  async _fetchImageVariationUri(variationHref) {
    if (!variationHref) return '';

    const requestUrl = `${this.endPointUrl}${variationHref}`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Accept: `${this.acceptHeader}ContentImageVariation+json`,
      },
    });

    return response.json();
  }

  async _fetchImage(imageUri) {
    if (!imageUri) throw new Error('Image uri not defined');

    const requestUrl = `${this.endPointUrl}${imageUri}`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpg',
      },
    });

    return response.blob();
  }

  _fetchCategories(destinationContentIds) {
    const categoriesPromises = destinationContentIds.map((contentID) => {
      return this._fetchObjectByID(contentID);
    }, this);

    return Promise.all(categoriesPromises);
  }

  _buildContentTypeCriterion(contentTypes, criterionObject = {}) {
    if (!contentTypes.length) return criterionObject;
    const contentTypeCriterion = criterionObject;

    contentTypeCriterion.OR = {};
    contentTypeCriterion.OR.ContentTypeIdentifierCriterion = contentTypes.shift();
    contentTypeCriterion.OR = this._buildContentTypeCriterion(contentTypes, contentTypeCriterion.OR);
    return contentTypeCriterion;
  }
}
