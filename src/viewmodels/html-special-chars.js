module.exports = {
  data: function () {
    return require('../models/html-special-chars.js');
  },
  computed: {
    result: function () {
      return this.espace(this.source);
    }
  },
  template: '#html-special-chars',
  methods: {
    espace: function (source) {
      var chars = {
            '&': '&amp;',
            '\'': '&#039;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
          };

      return source.replace(/[&'"<>]/g, function (char) {
        return chars[char];
      });
    }
  }
};
