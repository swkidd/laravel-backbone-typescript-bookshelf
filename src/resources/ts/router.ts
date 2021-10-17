import * as Backbone from "backbone";
import { parseQuery } from "./utlis";

export default class Router extends Backbone.Router {
    constructor() {
        super({
            routes: {
                "": "myBooks",
                new: "addBook"
            }
        });
    }

    execute(callback, args) {
        args.push(parseQuery(args.pop()));
        if (callback) callback.apply(this, args);
    }

    public start(options?: Backbone.HistoryOptions): Router {
        Backbone.history.start(options);
        return this;
    }

    myBooks(query) {
        Backbone.Events.trigger("show:myBooks", query);
    }

    addBook() {
        Backbone.Events.trigger("show:addBook");
    }
}
