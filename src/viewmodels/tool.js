import Home from './home.js';
import DataURLGenerator from './data-url-generator.js';
import UnicodeGenerator from './unicode-generator.js';
import HTMLSpecialChars from './html-special-chars.js';
import data from '../models/tool.js';

export default {
  data: function () {
    return data;
  },
  template: '#tool',
  components: {
    'home': Home,
    'data-url-generator': DataURLGenerator,
    'unicode-generator': UnicodeGenerator,
    'html-special-chars': HTMLSpecialChars
  },
  ready: function () {
    this.bind();
    this.change();
  },
  beforeDestory: function () {
    this.unbind();
  },
  methods: {
    change: function (e) {
      const id = window.location.hash.replace(/^#/, '') || 'home';
      const tool = this.tools[id];

      if (tool && id !== this.currentView) {
        this.currentView = id;
        this.$root.subtitle = tool;

        if (e) {
          this.triggerClick();
        }
      }
    },
    triggerClick: function () {
      const Event = window.Event;
      let target;

      if (Event) {
        target = document.body.querySelector('.mdl-layout__obfuscator');

        if (target && target.className.indexOf('is-visible') > -1) {
          target.dispatchEvent(new Event('click'));
        }
      }
    },
    bind: function () {
      window.addEventListener('hashchange', this.change, false);
    },
    unbind: function (e) {
      window.removeEventListener('hashchange', this.change, false);
    }
  }
};
