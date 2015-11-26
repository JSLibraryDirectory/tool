(function () {
  var Vue = window.Vue;

  return new Vue({
    el: 'body',
    data: require('../models/index.js'),
    ready: function () {
      this.loading = false;
    },
    components: {
      menu: require('./menu.js'),
      tool: require('./tool.js')
    }
  });
})();
