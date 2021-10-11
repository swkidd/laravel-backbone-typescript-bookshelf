import * as Backbone from "backbone";

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
export class BookCollection extends Backbone.Collection<BookModel> {
    public model = BookModel;

    // url endpoint for book collection CRUD operations
    public url = "/api/v1/book";
    public urlRoot = "/api/v1/book";
}
