var React = require("react");
var ReactDOM = require("react-dom");
var {Map, List} = require("immutable");
var PriceService = require("./PriceService");
var StockListing = require("./components/StockListing.jsx");


var priceService = new PriceService("125.212.207.66");
priceService.on("open", () => {
    priceService.getCompanies()
        .then(companies => companies.filter(c => c.companyName).map(c => c.code))
        .then(codes => priceService.subscribeToStock(codes));
});


var App = React.createClass({
    getInitialState() {
        return {
            stockInfos: Map(),
        }
    },

    componentDidMount() {
        priceService.on("stockChanged", (stocks) => {
            this.setState(({stockInfos}) => ({
                "stockInfos": stockInfos.merge(stocks)
            }));
        });
    },

    render() {
        var {stockInfos} = this.state;
        return (
            <div>
                <StockListing stocks={stockInfos}/>
            </div>
        );
    },
});


ReactDOM.render(<App/>, document.getElementById("app"));
