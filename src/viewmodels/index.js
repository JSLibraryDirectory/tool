import Vue from 'vue';
import Menu from './menu.js'
import Tool from './tool.js'
import data from '../models/index.js';

const vm = new Vue({
  el: 'body',
  data: data,
  ready: function () {
    this.progress = false;
  },
  components: {
    menu: Menu,
    tool: Tool
  }
});
