import * as Backbone from "backbone";
import * as _ from "lodash";

import template from "../templates/list_book.template.html";

export default class ListBookView extends Backbone.View<Backbone.Model> {
    private static tpl = _.template(template);
    render() {
        // include CSRF token in request
        this.collection
            .fetch({
                beforeSend: xhr => {
                    const _token = $('meta[name="csrf-token"]').attr("content");
                    if (_token) {
                        xhr.setRequestHeader("X-CSRF-TOKEN", _token);
                    }
                }
            })
            .then(() => {
                this.$el.append(
                    ListBookView.tpl({ collection: this.collection })
                );
            });
        return this;
    }
}
