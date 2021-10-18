import AppView from "./views/app.view";
import Router from "./router";

new AppView({ el: $("#app") }).render();
new Router().start({ pushState: true });
