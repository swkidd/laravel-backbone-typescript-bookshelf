import * as Backbone from "backbone";
import * as _ from "lodash";
import { addCSRFHeader } from "../utlis";

import template from "../templates/list_book.template.html";

export default class ListBookView extends Backbone.View<Backbone.Model> {
    private static tpl = _.template(template);
    initialize() {
        Backbone.Events.on("showPage:book_list", this.showPage, this);
    }
    renderPage(query) {
        this.collection.url = "/api/v1/book" + this.makeQueryParams(query);
        this.collection
            .fetch({
                beforeSend: addCSRFHeader
            })
            .then(collection => {
                this.$el.html(
                    ListBookView.tpl({
                        collection,
                        query
                    })
                );
            });
        return this;
    }
    showPage(query) {
        this.renderPage(query);
        Backbone.history.navigate(`/${this.makeQueryParams(query)}`);
    }
    makeQueryParams(query) {
        const valid = (p, name) => (!!p ? `${name}=${p}` : "");
        if (typeof query === "object") {
            const page = valid(parseInt(query.page), "path");
            const orderBy = valid(query.orderBy, "orderBy");
            const order = valid(query.order, "order");
            const params = [page, orderBy, order].filter(q => q.length)
            if (params.length) {
                return `?${params.join('&')}`
            }
        }
        return "";
    }
}
