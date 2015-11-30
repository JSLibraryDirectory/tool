export default {
  source: '',
  regexp: /[&'"<>]/g,
  chars: {
    '&': '&amp;',
    '\'': '&#039;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
  }
};
