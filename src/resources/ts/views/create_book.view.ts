import * as Backbone from "backbone";
import { BookModel } from "../models/book.model";

import template from '../templates/create_book.template.html'

export default class CreateBookView extends Backbone.View<BookModel> {
  private static tpl: string = template;
  render(){
    this.$el.append( CreateBookView.tpl );
    return this;
  }
}