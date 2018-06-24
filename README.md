# timelion-yfinance

## Yahoo finance turned off the icharts API, so this is dead. 

A yahoo stock datasource for timelion.

### .yfinance(symbol, stat) Alias: .yfi(symbol, stat)
- **symbol** The ticker symbol of the stock. (Default: AAPL)
- **stat** open, high, low, close, or volume. (Default: close)

## Installing
As this is an example, I don't publish package for it, but installing directly from Github is fairly simple:

1. cd to your `kibana/plugins` or `kibana/installedPlugins` directory. Only one of those will exist depending on your Kibana version.
2. `wget https://github.com/rashidkpc/timelion-yfinance/archive/master.zip`
3. `unzip master.zip`
4. `rm kibana-yfinance-master/gulpfile.js` (This is a dev environment thing. Kibana won't start if you don't remove `gulpfile.js`)
4. Start kibana (and delete that master.zip if you want, or not, it won't break anything)
