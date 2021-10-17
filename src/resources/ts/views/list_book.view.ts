import * as Backbone from "backbone";
import * as _ from "lodash";
import { BookCollection } from "../models/book.model";

import BookView from "./book.view";

interface IListBookView {
    bookCollection: BookCollection;
    currentPageNumber: number;
}

export default class ListBookView extends Backbone.View implements IListBookView {
    public bookCollection = new BookCollection();
    public currentPageNumber = 1;

    initialize() {
        this.render();
    }

    nextPage() {
        this.currentPageNumber += 1
        this.renderParams()
    }

    prevPage() {
        if (this.currentPageNumber === 1) return
        this.currentPageNumber -= 1
        this.renderParams()
    }

    addOne(book) {
        // on destroy repopulate list
        book.on('destroy', () => this.renderParams.call(this))
        const bookView = new BookView({ model: book });
        this.$el.append(bookView.render().el);
    }

    renderParams(params = new URLSearchParams()) {
        const pageNumber = parseInt(params.get("page") || "");
        if (!!pageNumber) {
            this.currentPageNumber = pageNumber;
        }
        params.set('page', this.currentPageNumber.toString())

        // add CSRF header to requests
        this.bookCollection.fetch(params).then(() => {
            this.$el.empty()
            this.setElement($('#table-book-list'))
            this.bookCollection.each(this.addOne, this);
        });

        return this;
    }
}
