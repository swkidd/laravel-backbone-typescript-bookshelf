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
            "click button.first-page": () =>
                this.listBookView.goToPage("first"),
            "click button.prev-page": () => this.listBookView.goToPage("prev"),
            "click button.next-page": () => this.listBookView.goToPage("next"),
            "click button.last-page": () => this.listBookView.goToPage("last"),
            "click span.order-author-desc": () =>
                this.orderPage("author", "DESC"),
            "click span.order-author-asc": () =>
                this.orderPage("author", "ASC"),
            "click span.order-title-desc": () =>
                this.orderPage("title", "DESC"),
            "click span.order-title-asc": () => this.orderPage("title", "ASC"),
            "click button.search-button": "search",
            "click button.clear-search-button": "clearSearch"
        };
    }

    search() {
        const search = $("#search-bar").val() as string;
        const searchBy = $("#search-filter-select").val() as string;
        this.listBookView.renderParams({ search, searchBy, page: 1 });
    }

    clearSearch() {
        $("#search-bar").val("");
        $("#search-filter-select").val("");
        this.listBookView.renderParams();
    }

    orderPage(orderBy, order) {
        this.listBookView.renderParams({ orderBy, order });
    }

    render() {
        this.$el.append(TableBookView.tpl());
        return this;
    }

    renderPage(query) {
        this.listBookView.renderParams(query);
        this.render();
        return this;
    }
}
