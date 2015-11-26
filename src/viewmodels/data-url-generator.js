module.exports = {
  data: function () {
    return require('../models/data-url-generator.js');
  },
  template: '#data-url-generator',
  methods: {
    read: function (file, callback) {
      var reader;

      if (file) {
        reader = new FileReader();

        reader.onload = function () {
          callback(this.result);
        };

        reader.readAsDataURL(file);
      } else {
        callback();
      }
    },
    change: function (e) {
      var _this = this;
      var target = e.target;
      var files = target.files;

      this.read(files && files[0], function (dataURL) {
        _this.dataURL = dataURL;
        target.value = '';
      });
    },
    dragover: function (e) {
      e.preventDefault();
    },
    drop: function (e) {
      var _this = this;
      var files = e.dataTransfer.files;

      e.preventDefault();

      this.read(files && files[0], function (dataURL) {
        _this.dataURL = dataURL;
      });
    }
  }
};
