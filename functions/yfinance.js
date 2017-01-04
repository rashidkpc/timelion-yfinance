var alter = require('../../../src/core_plugins/timelion/server/lib/alter.js');
var Datasource = require('../../../src/core_plugins/timelion/server/lib/classes/datasource');
var moment = require('moment');
const fetch = require('node-fetch');
fetch.Promise = require('bluebird');

var _ = require('lodash');

module.exports = new Datasource('yfinance', {
  args: [
    {
      name: 'symbol',
      types: ['string'],
      multi: false
    },
    {
      name: 'stat',
      types: ['number', 'null'],
    },
    {
      name: 'label',
      types: ['string', 'null']
    }
  ],
  aliases: ['yfi'],
  help: 'Get stock ticker data from yahoo finance',
  fn: function randomFn(args, tlConfig) {

    const config = _.defaults(args.byName, {
      symbol: 'AAPL',
      stat: 'close'
    });

    const time = {
      min:  moment.utc(tlConfig.time.from),
      max:  moment.utc(tlConfig.time.to)
    };

    // POSITIONS
    // 1. open
    // 2. high
    // 3. low
    // 4. close
    // 5. volume

    //curl -XGET 'http://ichart.finance.yahoo.com/table.csv?s=WU&a=0&b=28&c=2010&d=1&e=1&f=2010&g=d&ignore=.csv'

    const URL = 'http://ichart.finance.yahoo.com/table.csv?s=' + config.symbol +
      '&a=' + time.min.month() +
      '&b=' + (time.min.date() - 1) +
      '&c=' + time.min.year() +
      '&d=' + time.max.month() +
      '&e=' + (time.max.date() - 1) +
      '&f=' + time.max.year() +
      '&g=d' + // d=day, m=month, w=week
      '&ignore=.csv';

    return fetch(URL).then(function (resp) { return resp.text(); }).then(function (resp) {
      var rows = resp.split('\n');
      rows.shift();
      rows.pop();
      console.log('\n');

      rows = _.map(rows, function (row) {
        var fields = row.split(',');
        return {
          date: moment(fields[0]),
          open: fields[1],
          high: fields[2],
          low: fields[3],
          close: fields[4],
          volume: fields[5],
        };
      });

      const data = _.map(rows, function (row) {
        return [row.date.valueOf(), row[config.stat]];
      }).reverse();

      return {
        type: 'seriesList',
        list: [{
          data:  data,
          type: 'series',
          fit: 'nearest',
          label: config.symbol + ': ' + config.stat
        }]
      };
    }).catch(function (e) {
      throw e;
    });
  }
});
