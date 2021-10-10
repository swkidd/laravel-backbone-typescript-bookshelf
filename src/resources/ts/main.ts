import * as Backbone from "backbone";
import * as _ from "lodash";
import { BookCollection, BookModel } from "./models/book.model";

import CreateBookView from "./views/create_book.view";
import ListBookView from "./views/list_book.view";

let vent: Backbone.Events = _.extend({}, Backbone.Events);

const DEBUG: boolean = true;
const makeBook = (a,t)=> new BookModel({ author: a, title: t})
const bookCollection = new BookCollection([
    makeBook("Shakespere", "Hamlet"),
    makeBook("J.D Salinger", "The Catcher in the Rye"),
    makeBook("Euclid", "Elements"),
    makeBook("Bertrand Russel", "Principa Mathematica"),
])

class AppView extends Backbone.View<Backbone.Model> {
    constructor(options: Backbone.ViewOptions) {
        super(options);
    }
    initialize() {
        vent.on("myBooks:show", this.showMyBooks, this);
    }
    showMyBooks() {
        const createBookView = new CreateBookView();
        const listBookView = new ListBookView({ collection: bookCollection });
        this.$el.html();
        this.$el.append(createBookView.render().el);
        this.$el.append(listBookView.render().el);
    }
}

class AppRouter extends Backbone.Router {
    constructor(options?: Backbone.RouterOptions) {
        super(options);

        this.routes = <any>{
            "": "myBooks"
        };
        (<any>this)._bindRoutes();
    }
    initialize() {
        if (DEBUG) {
            vent.on("all", function(eventName) {
                console.log("EVENT: " + eventName);
            });
        }
    }
    public start(options?: Backbone.HistoryOptions): AppRouter {
        Backbone.history.start(options);
        return this;
    }

    myBooks() {
        vent.trigger("myBooks:show");
    }
}

var app_view = new AppView({ el: $("#app") }).render();
var app_router = new AppRouter().start({ pushState: true });
