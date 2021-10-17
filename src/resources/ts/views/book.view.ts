import * as Backbone from "backbone";
import * as _ from "lodash";

import template from "../../views/templates/book.template.html";
import editTemplate from "../../views/templates/edit_book.template.html";

export default class BookView extends Backbone.View<Backbone.Model> {
    private static tpl = _.template(template);
    private static editTpl = _.template(editTemplate);
    constructor(options) {
        super({ ...options, tagName: "tr" });
    }
    initialize() {
        this.model.on("destroy", this.remove, this);
    }

    events() {
        return {
            "click button.delete": "deleteBook",
            "click button.edit": "editBook",
            "click button.edit-save": "editSave",
            "click button.edit-cancel": "editCancel"
        };
    }

    deleteBook() {
        // add CSRF header to delete request
        this.model.destroy();
    }

    editBook() {
        this.$el.html(BookView.editTpl({ book: this.model }));
    }

    editSave() {
        const id = this.model.get("id");
        this.model.set({
            author: this.$el.find(`#edit-author-input-${id}`).val(),
            title: this.$el.find(`#edit-title-input-${id}`).val()
        });
        // add CSRF header to save request
        this.model.save(this.model.attributes);
        this.editCancel();
    }

    editCancel() {
        this.$el.html(BookView.tpl({ book: this.model }));
    }

    render() {
        this.$el.html(BookView.tpl({ book: this.model }));
        return this;
    }
}
