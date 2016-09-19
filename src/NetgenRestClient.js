/* Simple wrapper around eZ platform REST API for fetching content */


export default class NetgenRestClient {
  constructor(props) {
    this.endPointUrl = props.endPointUrl;
    this.apiPath = props.apiPath || '/api/ezp/v2/';
    this.acceptHeader = props.acceptHeader || 'application/vnd.ez.api.';
  }

  async getArticles(numberOfItems, category, imageVariation) {
    const { View: response } = await this._fetchArticles(numberOfItems, category);
    const articles = response.Result.searchHits.searchHit.map(result => result.value.Content);
    const images = await this.getArticlesImageUrls(articles, imageVariation);

    return articles.map((article, index) => ({
        [article.Name]: {
          content: article,
          image: images[index],
        }
    }));
  }

  async getArticleByID(objectID, imageVariation) {
    if (!objectID) throw "Object ID not defined";

    const { Content: article } = await this._fetchObjectByID(objectID);
    const image = await this.getArticleImageUrl(article, imageVariation);

    return {
      [article.Name]: {
        content: article,
        image: image,
      }
    };
  }

  getArticlesImageUrls(articles, variation = 'small') {
    let imagePromises = articles.map((article) => {
      return this.getArticleImageUrl(article, variation);
    }, this);

    return Promise.all(imagePromises);
  }

  async getArticleImageUrl(article, variation) {
    const articleFields = article.CurrentVersion.Version.Fields.field;
    const imageField = articleFields.find(el => el.fieldDefinitionIdentifier === 'image').fieldValue;

    if (!imageField) return;

    const imageUri = imageField.uri;
    const imageVariation = imageField.variations[variation];

    let imageVariationUri = '';
    if (imageVariation && imageVariation.href) {
      const { ContentImageVariation } = await this._fetchImageVariationUri(imageVariation.href);
      imageVariationUri = ContentImageVariation.uri;
    }

    return `${this.endPointUrl}${imageVariationUri || imageUri}`;
  }

  async _fetchArticles(numberOfItems = 10, category = 'ng_news') {
    const requestUrl = `${this.endPointUrl}${this.apiPath}views`;
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Accept': `${this.acceptHeader}View+json; version=1.1`,
        'Content-Type': `${this.acceptHeader}ViewInput+json; version=1.1`
      },
      body: JSON.stringify({
          "ViewInput": {
            "identifier": `${category}_view`,
            "ContentQuery": {
              "Criteria": { "ContentTypeIdentifierCriterion": category },
              "limit": numberOfItems,
              "offset": "0",
              "SortClauses": { "DatePublished": "descending" }
            }
          }
        })
    });

    return response.json();
  }

  async _fetchObjectByID(objectContentID) {
    const requestUrl = `${this.endPointUrl}${this.apiPath}content/objects/${objectContentID}`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': `${this.acceptHeader}Content+json`,
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
        'Accept': `${this.acceptHeader}ContentImageVariation+json`,
      },
    });

    return response.json();
  }

  async _fetchImage(imageUri) {
    if (!imageUri) throw "Image uri not defined";

    const requestUrl = `${this.endPointUrl}${imageUri}`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpg',
      },
    });

    return response.blob();
  }
}
