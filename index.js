module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'timelion-yfinance',
    require: ['timelion'],
    init: function (server) {
      // Initialize your function plugins here.
      server.plugins.timelion.addFunction(require('./functions/yfinance'));
    }
  });
};
