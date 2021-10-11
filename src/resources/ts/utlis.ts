const $ = require("jquery");

// add CSRF header stored in page meta to request
export function addCSRFHeader(xhr) {
    const _token = $('meta[name="csrf-token"]').attr("content");
    if (_token) {
        xhr.setRequestHeader("X-CSRF-TOKEN", _token);
    }
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
