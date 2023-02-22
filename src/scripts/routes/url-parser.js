const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
      + (splitedUrl.id ? '/:id' : '')
      + (splitedUrl.verb ? `/${splitedUrl.verb}` : '');
  },

  parseActiveUrlQuery() {
    const url = window.location.hash.slice(1).toLowerCase();
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    // eslint-disable-next-line array-callback-return
    paramArr.map((param) => {
      const [key, val] = param.split('=');
      params[key] = decodeURIComponent(val);
    });
    return params;
  },

  parsePageQuery() {
    const { page } = this.parseActiveUrlQuery();
    return page;
  },

  parseSearchQuery() {
    const { q } = this.parseActiveUrlQuery();
    return q;
  },
};

export default UrlParser;
