import * as Backbone from "backbone";
import { BookModel } from "../models/book.model";

import template from "../../views/templates/add_book.template.html";

export default class AddBookView extends Backbone.View<BookModel> {
    private static tpl: string = template;

    events() {
        return {
            "click button.add-book-button": this.addBook
        };
    }

    addBook() {
        const author = $("#book-author").val() as string;
        const title = $("#book-title").val() as string;
        if (author && title) {
            const book = new BookModel({ author, title });
            book.save(book.attributes, {
                success: () => {
                    $("#book-author").val('')
                    $("#book-title").val('');
                    $("#book-added-alert").removeClass('d-none');
                    $("#book-added-alert").addClass('show');
                }
            });
        }
    }

    render() {
        this.$el.append(AddBookView.tpl);
        return this;
    }
}
