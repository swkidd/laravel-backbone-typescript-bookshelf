import * as Backbone from "backbone";
import * as _ from "lodash";

import ListBookView from "./list_book.view";
import template from "../templates/table_book.template.html";

interface ITableBookView {
    listBookView: Backbone.View;
}

export default class TableBookView extends Backbone.View<Backbone.Model> implements ITableBookView {
    private static tpl = _.template(template);
    public listBookView = new ListBookView();

    events() {
        return {
            "click button.prev-page": "prevPage",
            "click button.next-page": "nextPage"
        };
    }

    prevPage() {}

    nextPage() {}

    renderPage(query) {
        const queryString = new URLSearchParams(query).toString();
        this.$el.append(TableBookView.tpl());
        this.$el.find("#table-book-list").html(this.listBookView.el);
        Backbone.history.navigate(`/${queryString}`);
        return this;
    }
}
