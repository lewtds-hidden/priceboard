var React = require("react");
var ReactDOM = require("react-dom");
var SockJS = require("sockjs-client");
var StockStore = require("./StockStore");


var App = React.createClass({
    render() {
        var stockStore = Stores.stockStore;
        stockStore.sock.onopen = () => {
            stockStore.listenToStock("VND");
        }

        return (
            <StockTable stockStore={stockStore}/>
        );
    }
});


var StockTable = React.createClass({
    componentDidMount() {
        this.props.stockStore.on("all", this.forceUpdate.bind(this));
    },

    render() {
        var {stockStore} = this.props;
        console.log(stockStore);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>
                    </tr>
                </thead>

                <tbody>
                    {stockStore.map(stock => <StockRow stock={stock} key={stock.code}/>)}
                </tbody>
            </table>
        );
    }
});


var StockRow = function({stock: {code, price}}) {
    console.log(code);
    return (
        <tr>
            <td>{code}</td>
            <td>{price}</td>
            <td>haha</td>
        </tr>
    );
};

var Stores = {
    stockStore: new StockStore([], {
        priceServer: "202.160.124.70"
    }),
};

ReactDOM.render(<App/>, document.getElementById("app"));
