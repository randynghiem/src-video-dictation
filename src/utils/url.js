/**
 * to extract value of named parameter from a given link
 * @param {*} link Link to be extracted
 * @param {*} name name of the parameter
 */
export function getUrlParameter(link, name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(link);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};