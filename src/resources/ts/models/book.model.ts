import * as Backbone from "backbone";
import { addCSRFHeader, parseURLQueryParams } from "../utlis";

interface IBookModel {
    title: string;
    author: string;
}
/**
 * Backbone book model
 */
export class BookModel extends Backbone.Model implements IBookModel {
    // url endpoint for book CRUD operations
    public urlRoot = "/api/v1/book";

    get title(): string {
        return this.get("title");
    }
    set title(title: string) {
        this.set("title", title);
    }
    get author(): string {
        return this.get("author");
    }
    set author(author: string) {
        this.set("author", author);
    }

    sync(method, model, options) {
        options = { beforeSend: addCSRFHeader, ...options };
        return super.sync(method, model, options);
    }

    constructor(input: IBookModel) {
        super();
        for (var key in input) {
            if (key) {
                this.attributes[key] = input[key];
            }
        }
    }
}

/**
 * Backbone book collection
 */
export class BookCollection extends Backbone.Collection<Backbone.Model> {
    public model = BookModel;

    public pagination: any = {};

    // url endpoint for book collection CRUD operations
    public baseUrl = "/api/v1/book";
    public url = "/api/v1/book";

    goToPage(page): any {
        const pageUrl = this.pagination[page + "_page_url"];
        if (pageUrl) {
            const urlParams = new URLSearchParams(location.search);
            urlParams.delete("page");
            const params = Object.fromEntries(urlParams.entries());
            this.url = pageUrl;
            return new Promise(resolve =>
                this.fetch(params)
                    .then(() => resolve(true))
                    .catch(() => resolve(false))
            );
        }
        return Promise.resolve(false);
    }

    parse(resp) {
        const data = resp.data;
        delete resp.data;
        this.pagination = resp;
        return data;
    }

    fetch(params) {
        // get query params for current url
        const currQuery = parseURLQueryParams(this.url);
        const currParams = new URLSearchParams(currQuery);

        if (params) {
            // replace all params in current url with params passed in
            for (let key in params) {
                if (params[key]) {
                    currParams.set(key, params[key]);
                }
            }
        }

        const queries = currParams.toString();
        const queryString = queries ? "?" + queries : "";
        const url = this.baseUrl + queryString;

        // append search params to browswer url without triggering a Backbone update
        const success = () => Backbone.history.navigate(queryString);

        const options = { url, success };
        return super.fetch(options);
    }

    sync(method, collection, options) {
        options = { beforeSend: addCSRFHeader, ...options };
        return super.sync(method, collection, options);
    }
}
