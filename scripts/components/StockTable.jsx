var React = require("react");
var {formatPrice, formatQty} = require("../utils");


var StockTable = function({stocks}) {
    // var stocks = stocks.sort();
    var start = Date.now();
    stocks = stocks.sortBy(s => s.code);
    console.log("sort: ", Date.now() - start)
    return (
        <table className="uk-table">
            <thead>
                <tr>
                    <th rowSpan={2}>Mã CK</th>
                    <th rowSpan={2}>TC</th>
                    <th rowSpan={2}>Trần</th>
                    <th rowSpan={2}>Sàn</th>
                    <th rowSpan={2}>Tổng KL</th>

                    <th colSpan={6}>Bên mua</th>
                    <th colSpan={3}>Khớp lệnh</th>
                    <th colSpan={6}>Bên bán</th>

                    <th rowSpan={2}>Cao</th>
                    <th rowSpan={2}>Thấp</th>
                    <th rowSpan={2}>Dư mua</th>
                    <th rowSpan={2}>Dư bán</th>

                    <th colSpan="3">Đầu tư nước ngoài</th>
                </tr>

                <tr>
                    <th>Giá 3</th>
                    <th>KL 3</th>
                    <th>Giá 2</th>
                    <th>KL 2</th>
                    <th>Giá 1</th>
                    <th>KL 1</th>

                    <th>Giá</th>
                    <th>KL</th>
                    <th>+/-</th>

                    <th>Giá 1</th>
                    <th>KL 1</th>
                    <th>Giá 2</th>
                    <th>KL 2</th>
                    <th>Giá 3</th>
                    <th>KL 3</th>

                    <th>Mua</th>
                    <th>Bán</th>
                    <th>Dư</th>
                </tr>
            </thead>

            <tbody>
                {stocks.map(stock => (
                    <tr key={stock.code}>
                        <td>{stock.code}</td>
                        <td>{formatPrice(stock.basicPrice)}</td>
                        <td>{formatPrice(stock.ceilingPrice)}</td>
                        <td>{formatPrice(stock.floorPrice)}</td>
                        <td>NaN</td>

                        <td>{formatPrice(stock.bidPrice03)}</td>
                        <td>{formatQty(stock.bidQtty03)}</td>
                        <td>{formatPrice(stock.bidPrice02)}</td>
                        <td>{formatQty(stock.bidQtty02)}</td>
                        <td>{formatPrice(stock.bidPrice01)}</td>
                        <td>{formatQty(stock.bidQtty01)}</td>

                        <td>{formatPrice(stock.matchPrice)}</td>
                        <td>{formatQty(stock.matchQtty)}</td>
                        <td>NaN</td>

                        <td>{formatPrice(stock.offerPrice01)}</td>
                        <td>{formatQty(stock.offerQtty01)}</td>
                        <td>{formatPrice(stock.offerPrice02)}</td>
                        <td>{formatQty(stock.offerQtty02)}</td>
                        <td>{formatPrice(stock.offerPrice03)}</td>
                        <td>{formatQty(stock.offerQtty03)}</td>

                        <td>{formatPrice(stock.highestPrice)}</td>
                        <td>{formatPrice(stock.lowestPrice)}</td>
                        <td>NaN</td>
                        <td>NaN</td>

                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

module.exports = StockTable;
