module.exports = {
  data: function () {
    return require('../models/unicode-generator.js');
  },
  computed: {
    unicode: function () {
      return this.parse(this.content);
    }
  },
  template: '#unicode-generator',
  ready: function () {
    this.upgrade(this.$els.checkbox);
  },
  beforeDestroy: function () {
    this.downgrade(this.$els.checkbox);
  },
  methods: {
    parse: function (content) {
      var length = content.length;
      var unicode = [];
      var i = 0;

      while (i < length) {
        unicode.push(this.format(content.charCodeAt(i++).toString(16)));
      }

      return unicode.join(this.hasSeparator ? ',' : '');
    },
    format: function (hex) {
      var prefix = {
            0: '0x',
            1: '0x0',
            2: '0x00',
            3: '0x000'
          };

      return prefix[4 - hex.length] + hex;
    },
    upgrade: function (target) {
      var componentHandler = window.componentHandler;

      if (componentHandler) {
        componentHandler.upgradeElements(target);
      }
    },
    downgrade: function (target) {
      var componentHandler = window.componentHandler;

      if (componentHandler) {
        componentHandler.downgradeElements(target);
      }
    }
  }
};
