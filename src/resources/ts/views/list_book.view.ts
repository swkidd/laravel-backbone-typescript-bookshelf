import * as Backbone from "backbone";
import * as _ from "lodash";
import { BookCollection } from "../models/book.model";
import { addCSRFHeader } from "../utlis";

import BookView from "./book.view";

export default class ListBookView extends Backbone.View {
    initialize() {
        this.collection = new BookCollection();
        this.renderParams();
    }

    addOne(book) {
        const bookView = new BookView({ model: book });
        this.$el.append(bookView.render().el);
    }

    renderParams(params = {}) {
        // add CSRF header to requests
        this.collection.fetch({ beforeSend: addCSRFHeader }).then(() => {
            this.setElement($("tbody"));
            this.collection.each(this.addOne, this);
        });
        return this;
    }
}
