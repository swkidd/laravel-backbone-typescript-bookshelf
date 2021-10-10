import * as Backbone from "backbone";

interface IBookModel {
    title: string;
    author: string;
}

export class BookModel extends Backbone.Model implements IBookModel {
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
                this[key] = input[key];
            }
        }
    }
}


export class BookCollection extends Backbone.Collection<BookModel> {
    public model = BookModel
}
