import data from '../models/html-special-chars.js';

export default {
  data: function () {
    return data;
  },
  computed: {
    result: function () {
      return this.espace(this.source);
    }
  },
  template: '#html-special-chars',
  methods: {
    espace: function (source) {
      return source.replace(this.regexp, char => {
        return this.chars[char];
      });
    }
  }
};
