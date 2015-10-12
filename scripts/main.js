var React = require("react");
var ReactDOM = require("react-dom");
var {Map, List} = require("immutable");
var PriceService = require("./PriceService");
var _ = require("underscore");


var priceService = new PriceService("125.212.207.66");
priceService.on("open", () => {
    priceService.getCompanies()
        .then(companies => companies.filter(c => c.companyName).map(c => c.code))
        .then(codes => priceService.subscribeToStock(codes));
});

function formatPrice(price) {
    return "" + (price / 1000);
}

function formatQty(qty) {
    return "" + (qty / 100);
}

var App = React.createClass({
    getInitialState() {
        return {
            stockInfos: Map()
        }
    },

    componentDidMount() {
        priceService.on("stockChanged", (stocks) => {
            console.log(stocks);
            this.setState(({stockInfos}) => ({
                "stockInfos": stockInfos.merge(stocks)
            }));
        });
    },

    render() {
        return (
            <StockTable stocks={this.state.stockInfos}/>
        );
    }
});


var StockTable = function({stocks}) {
    // var stocks = stocks.sort();
    stocks = stocks.sortBy(s => s.code);
    return (
        <table>
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

ReactDOM.render(<App/>, document.getElementById("app"));
