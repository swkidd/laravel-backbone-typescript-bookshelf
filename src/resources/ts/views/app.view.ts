import * as Backbone from "backbone";

import TableBookView from "./table_book.view";
import AddBookView from "./add_book.view";

export default class AppView extends Backbone.View<Backbone.Model> {
    constructor(options: Backbone.ViewOptions) {
        super(options);
    }
    initialize() {
        Backbone.Events.on("show:myBooks", this.showMyBooks, this);
        Backbone.Events.on("show:addBook", this.addBook, this);
    }
    showMyBooks(query) {
        this.$el.html(new TableBookView().renderPage(query).el);
    }
    addBook() {
        this.$el.html(new AddBookView().render().el);
    }
}