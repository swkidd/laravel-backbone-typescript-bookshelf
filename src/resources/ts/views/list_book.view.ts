import * as Backbone from "backbone";
import * as _ from "lodash";
import { BookCollection } from "../models/book.model";

import BookView from "./book.view";

interface IListBookView {
    bookCollection: BookCollection;
}

export default class ListBookView extends Backbone.View
    implements IListBookView {
    public bookCollection;

    initialize() {
        this.bookCollection = new BookCollection();
    }

    goToPage(page) {
        this.bookCollection.goToPage(page).then(shouldRender => {
            if (shouldRender) {
                this.render();
            }
        });
    }

    addOne(book) {
        // on destroy repopulate list
        book.on("destroy", () => this.renderParams());

        const bookView = new BookView({ model: book });
        this.$el.append(bookView.render().el);
    }

    render() {
        this.$el.empty();
        this.setElement($("#table-book-list"));
        this.bookCollection.each(this.addOne, this);
        return this;
    }

    renderParams(params?) {
        return this.bookCollection.fetch(params).then(() => {
            this.render();
        });
    }
}
