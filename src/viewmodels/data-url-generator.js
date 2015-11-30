import data from '../models/data-url-generator.js';

export default {
  data: function () {
    return data;
  },
  template: '#data-url-generator',
  methods: {
    read: function (file, callback) {
      let reader;

      if (file) {
        reader = new FileReader();

        reader.onload = e => {
          callback(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        callback();
      }
    },
    change: function (e) {
      const target = e.target;
      const files = target.files;

      this.read(files && files[0], dataURL => {
        this.dataURL = dataURL;
        target.value = '';
      });
    },
    dragover: function (e) {
      e.preventDefault();
    },
    drop: function (e) {
      const files = e.dataTransfer.files;

      e.preventDefault();

      this.read(files && files[0], dataURL => {
        this.dataURL = dataURL;
      });
    }
  }
};
