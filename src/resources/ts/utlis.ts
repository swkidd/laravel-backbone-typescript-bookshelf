const $ = require("jquery");

// add CSRF header stored in page meta to request
export function addCSRFHeader(xhr) {
    const _token = $('meta[name="csrf-token"]').attr("content");
    if (_token) {
        xhr.setRequestHeader("X-CSRF-TOKEN", _token);
    }
}

// return query param string from url
export function parseURLQueryParams(url) {
    const queryIndex = url.indexOf('?')
    if (queryIndex > -1) {
        return url.substring(queryIndex)
    }
    return ''
}

// parse url query params into json (x=4 => ({ x: 4 }))
export function parseQuery(queryString) {
    const query = {};
    if (!queryString) return query;
    let pairs = (queryString[0] === "?"
        ? queryString.substr(1)
        : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split("=");
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
}
