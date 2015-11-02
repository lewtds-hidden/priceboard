var React = require('react');
var {Map} = require('immutable');
var {formatPrice, formatQty, getChangeClass} = require('../utils');

var StockRow = React.createClass({
    getDefaultProps() {
        return {
            stock: Map()
        };
    },

    render() {
        var {stock} = this.props;
        var defaultPrices = {
            basicPrice: stock.basicPrice,
            ceilingPrice: stock.ceilingPrice,
            floorPrice: stock.floorPrice
        };

        var _getChangeClass = function(price) {
            return getChangeClass(price, defaultPrices);
        };

        var getDiffValue = function(price) {
            return price === 0 ? 0 : price - defaultPrices.basicPrice;
        };

        return (
            <tr key={stock.code}>
                <td className={_getChangeClass(stock.matchPrice)}>{stock.code}</td>
                <td className="text-right ref">{formatPrice(stock.basicPrice)}</td>
                <td className="text-right ceiling">{formatPrice(stock.ceilingPrice)}</td>
                <td className="text-right floor">{formatPrice(stock.floorPrice)}</td>
                <td>NaN</td>

                <td className={`text-right ${_getChangeClass(stock.bidPrice03)}`}>{formatPrice(stock.bidPrice03)}</td>
                <td className={`text-right ${_getChangeClass(stock.bidPrice03)}`}>{formatQty(stock.bidQtty03)}</td>
                <td className={`text-right ${_getChangeClass(stock.bidPrice02)}`}>{formatPrice(stock.bidPrice02)}</td>
                <td className={`text-right ${_getChangeClass(stock.bidPrice02)}`}>{formatQty(stock.bidQtty02)}</td>
                <td className={`text-right ${_getChangeClass(stock.bidPrice01)}`}>{formatPrice(stock.bidPrice01)}</td>
                <td className={`text-right ${_getChangeClass(stock.bidPrice01)}`}>{formatQty(stock.bidQtty01)}</td>

                <td className={`text-right ${_getChangeClass(stock.matchPrice)}`}>{formatPrice(stock.matchPrice)}</td>
                <td className={`text-right ${_getChangeClass(stock.matchPrice)}`}>{formatQty(stock.matchQtty)}</td>
                <td className={`text-right ${_getChangeClass(stock.matchPrice)}`}>{formatPrice(getDiffValue(stock.matchPrice))}</td>

                <td className={`text-right ${_getChangeClass(stock.offerPrice01)}`}>{formatPrice(stock.offerPrice01)}</td>
                <td className={`text-right ${_getChangeClass(stock.offerPrice01)}`}>{formatQty(stock.offerQtty01)}</td>
                <td className={`text-right ${_getChangeClass(stock.offerPrice02)}`}>{formatPrice(stock.offerPrice02)}</td>
                <td className={`text-right ${_getChangeClass(stock.offerPrice02)}`}>{formatQty(stock.offerQtty02)}</td>
                <td className={`text-right ${_getChangeClass(stock.offerPrice03)}`}>{formatPrice(stock.offerPrice03)}</td>
                <td className={`text-right ${_getChangeClass(stock.offerPrice03)}`}>{formatQty(stock.offerQtty03)}</td>

                <td className={`text-right ${_getChangeClass(stock.highestPrice)}`}>{formatPrice(stock.highestPrice)}</td>
                <td className={`text-right ${_getChangeClass(stock.lowestPrice)}`}>{formatPrice(stock.lowestPrice)}</td>
                <td>NaN</td>
                <td>NaN</td>

                <td>NaN</td>
                <td>NaN</td>
                <td>NaN</td>
            </tr>
        );
    }
});

module.exports = StockRow;
