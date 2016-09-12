/* Simple wrapper around eZ platform REST API for fetching content */


export default class NetgenRestClient {
  constructor(props) {
    this.endPointUrl = props.endPointUrl;
    this.acceptHeader = props.acceptHeader || 'application/vnd.ez.api.';
  }

  async getArticles(numberOfItems = 10, category = 'ng_news') {
    const requestUrl = `${this.endPointUrl}views`;
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

  async getArticleByID(objectID) {
    if (!objectID) throw "Object ID not defined";

    const requestUrl = `${this.endPointUrl}content/objects/${objectID}`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': `${this.acceptHeader}Content+json`,
      },
    });

    return response.json();
  }
}
