import * as Backbone from "backbone";
import * as _ from "lodash";
import { addCSRFHeader } from "../utlis";

import template from "../templates/book.template.html";
import editTemplate from "../templates/edit_book.template.html";

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
        this.model.destroy({ beforeSend: addCSRFHeader });
    }

    editBook() {
        this.$el.html(BookView.editTpl({ book: this.model }));
    }

    editSave() {
        this.model.set({
            author: this.$el.find("#edit-author-input").val(),
            title: this.$el.find("#edit-title-input").val()
        });
        // add CSRF header to save request
        this.model.save(this.model.attributes, { beforeSend: addCSRFHeader });
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
