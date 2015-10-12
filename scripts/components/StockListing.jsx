var React = require("react");
var {FloorCode} = require("../common");
var StockTable = require("./StockTable.jsx");
var classNames = require("classnames");


var StockListing = React.createClass({
    getInitialState() {
        return {
            activeTab: FloorCode.HNX
        };
    },

    render() {
        var {activeTab} = this.state;
        var start = Date.now();
        var stocks = this.props.stocks.filter(s => s.floorCode == activeTab);
        console.log("filter: ", Date.now() - start)

        var tabs = [[FloorCode.HOSE, "HOSE"],
                    [FloorCode.HNX, "HNX"],
                    [FloorCode.UPCOM, "UPCOM"]]
            .map(([key, title]) => {
                return (
                    <li className={classNames({"uk-active": key == activeTab})}
                        key={key} onClick={this.changeTab.bind(this, key)}>
                        <a href="#">{title}</a>
                    </li>);
            });

        return (
            <div>
                <ul className="uk-tab">
                    {tabs}
                </ul>

                <StockTable stocks={stocks}/>
            </div>
        );
    },

    changeTab(floorCode) {
        this.setState({
            activeTab: floorCode
        });
    },
});


module.exports = StockListing;
