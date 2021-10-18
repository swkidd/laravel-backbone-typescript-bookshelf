import * as Backbone from "backbone";

import TableBookView from "./table_book.view";
import AddBookView from "./add_book.view";
import ExportModalView from "./export_modal.view";

interface IAppView {
    exportModal: Backbone.View;
}

export default class AppView extends Backbone.View<Backbone.Model>
    implements IAppView {

    public exportModal = new ExportModalView();

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
