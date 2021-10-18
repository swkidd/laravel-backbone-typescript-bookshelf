import * as Backbone from "backbone";

import template from "../../views/templates/export_modal.template.html";

export default class ExportModalView extends Backbone.View<Backbone.Model> {
    private static tpl: string = template;

    initialize() {
        this.render();
    }

    events() {
        return {
            "click button.export-books-button": "exportBooks"
        };
    }

    exportBooks() {
        const baseUrl = $("#export-download-a").attr("data-base-url");
        const filetype = $("#export-filetype-select").val();
        const columns = $("#export-column-select").val();
        $("#export-download-a")
            .attr("href", `${baseUrl}?filetype=${filetype}&columns=${columns}`)
            .get(0)
            .click();
    }

    render() {
        this.$el.append(ExportModalView.tpl);
        $("#export-modal-container").append(this.$el);
        return this;
    }
}
