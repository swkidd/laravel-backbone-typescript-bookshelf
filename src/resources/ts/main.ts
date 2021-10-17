
import AppView from "./views/app.view"
import Router from "./router"

var app_view = new AppView({ el: $("#app") }).render();
var router = new Router().start({ pushState: true });
