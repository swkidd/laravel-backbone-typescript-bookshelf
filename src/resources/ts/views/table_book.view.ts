import * as Backbone from "backbone";
import * as _ from "lodash";

import ListBookView from "./list_book.view";
import template from "../../views/templates/table_book.template.html";

interface ITableBookView {
    listBookView: Backbone.View;
}

export default class TableBookView extends Backbone.View<Backbone.Model>
    implements ITableBookView {
    private static tpl = _.template(template);
    public listBookView = new ListBookView();

    events() {
        return {
            "click button.prev-page": "prevPage",
            "click button.next-page": "nextPage"
        };
    }

    prevPage() {
        this.listBookView.prevPage()
    }

    nextPage() {
        this.listBookView.nextPage()
    }

    render() {
        this.$el.append(TableBookView.tpl());
        return this;
    }

    renderPage(query) {
        const params = new URLSearchParams(query);

        this.listBookView.renderParams(params)
        this.render();

        return this;
    }
}
