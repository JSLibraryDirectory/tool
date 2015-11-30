import data from '../models/unicode-generator.js';

export default {
  data: function () {
    return data;
  },
  computed: {
    unicode: function () {
      return this.parse(this.content);
    }
  },
  template: '#unicode-generator',
  methods: {
    parse: function (content) {
      const length = content.length;
      let unicode = [];
      let i = 0;

      while (i < length) {
        unicode.push(this.format(content.charCodeAt(i++).toString(16)));
      }

      return unicode.join('');
    },
    format: function (hex) {
      const prefixes = {
        0: '\\u',
        1: '\\u0',
        2: '\\u00',
        3: '\\u000'
      };

      return prefixes[Math.max(0, 4 - hex.length)] + hex.toUpperCase();
    }
  }
};
