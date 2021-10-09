import * as Backbone from "backbone";

export class HeroView extends Backbone.View<Backbone.Model> {
  private static tpl = `
    <h1 class="text-center">Hello, World!</h1>
  `;
  initialize(){
    this.render();
  }
  render(){
    this.$el.append( HeroView.tpl );
    return this;
  }
}