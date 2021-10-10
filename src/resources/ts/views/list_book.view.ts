import * as Backbone from "backbone";
import * as _ from "lodash";

import template from '../templates/list_book.template.html'

export default class ListBookView extends Backbone.View<Backbone.Model> {
  private static tpl = _.template(template);
  render(){
    this.$el.append(ListBookView.tpl({ collection: this.collection }));
    return this;
  }
}