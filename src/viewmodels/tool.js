module.exports = {
  data: function () {
    return require('../models/tool.js');
  },
  template: '#tool',
  components: {
    'home': require('./home.js'),
    'data-url-generator': require('./data-url-generator.js'),
    'unicode-generator': require('./unicode-generator.js'),
    'html-special-chars': require('./html-special-chars.js')
  },
  ready: function () {
    this.bind();
    this.change();
  },
  beforeDestory: function () {
    this.unbind();
  },
  methods: {
    change: function () {
      var id = location.hash.replace(/^#/, '') || 'home';
      var tool = this.tools[id];

      if (tool && id !== this.currentView) {
        this.currentView = id;
        this.$root.subtitle = tool;
      }
    },
    bind: function () {
      window.addEventListener('hashchange', this.change);
    },
    unbind: function (e) {
      window.removeEventListener('hashchange', this.change);
    }
  }
};
