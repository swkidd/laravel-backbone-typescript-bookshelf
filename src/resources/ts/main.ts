import * as Backbone from "backbone";
import * as _ from "lodash";
import { parseQuery } from "./utlis";

import TableBookView from "./views/table_book.view";

class AppView extends Backbone.View<Backbone.Model> {
    constructor(options: Backbone.ViewOptions) {
        super(options);
    }
    initialize() {
        Backbone.Events.on("show:myBooks", this.showMyBooks, this);
    }
    showMyBooks(query) {
        this.$el.html(new TableBookView().renderPage(query).el);
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
    execute(callback, args, name) {
        args.push(parseQuery(args.pop()));
        if (callback) callback.apply(this, args);
    }
    public start(options?: Backbone.HistoryOptions): AppRouter {
        Backbone.history.start(options);
        return this;
    }

    myBooks(query) {
        Backbone.Events.trigger("show:myBooks", query);
    }
}

var app_view = new AppView({ el: $("#app") }).render();
var app_router = new AppRouter().start({ pushState: true });
