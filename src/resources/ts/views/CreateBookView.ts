import * as Backbone from "backbone";

import template from '../templates/CreateBookTemplate.html'

export class CreateBookView extends Backbone.View<Backbone.Model> {
  private static tpl = template;
  initialize(){
    this.render();
  }
  render(){
    this.$el.append( CreateBookView.tpl );
    return this;
  }
}