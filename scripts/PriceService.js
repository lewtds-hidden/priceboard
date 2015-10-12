var EventEmitter = require("events");
var SockJS = require("sockjs-client");
var $ = require("jquery");
var {Map, List} = require("immutable");


/**
 * A client for the VND price service. It emits the following events:
 *
 * - open
 * - stockChanged
 */
class PriceService extends EventEmitter {
    constructor(server) {
        super();
        this.server = server;

        this.sock = SockJS(this.server + "/realtime");

        this.sock.onopen = () => {
            this.emit("open");

            this._send({
                type: "post",
                data: {
                    sequence: 0,
                    params: {
                        name: "TRANSACTION",
                        symbol: ""
                    }
                }
            });

            setInterval(() => {
                this._send("heartbeat");
            }, 25000);
        };

        this.sock.onmessage = (event) => {
            var message = JSON.parse(event.data);
            var data;

            if (message.type === "returnData" && message.data.name !== "TRANSACTION") {
                data = message.data.data;
            } else if (message.type === "STOCK") {
                data = [message.data];
            } else {
                return;
            }

            var stocks = Map(data);
            this.emit("stockChanged", stocks.map(this._parseStockMessage));
        };
    }

    subscribeToStock(codes) {
        this._send({
            "type": "registConsumer",
            "data": {
                "sequence": 0,
                "params": {
                    "name": "STOCK",
                    "codes": codes
                }
            }
        });
    }

    _send(object) {
        this.sock.send(JSON.stringify(object));
    }

    _parseStockMessage(message) {
        var arr = message.split("|");
        var stockInfo = {};
        var scale = 1000;

        stockInfo.floorCode      = arr[0];
        stockInfo.tradingDate    = new Date(parseInt(arr[1]));
        stockInfo.time           = arr[2];
        stockInfo.code           = arr[3];
        stockInfo.companyName    = arr[4];
        stockInfo.stockType      = arr[5];
        stockInfo.totalRoom      = parseFloat(arr[6]);
        stockInfo.currentRoom    = parseFloat(arr[7]);
        stockInfo.basicPrice     = scale * parseFloat(arr[8]);
        stockInfo.openPrice      = scale * parseFloat(arr[9]);
        stockInfo.closePrice     = scale * parseFloat(arr[10]);
        stockInfo.currentPrice   = scale * parseFloat(arr[11]);
        stockInfo.currentQtty    = parseInt(arr[12]);
        stockInfo.highestPrice   = scale * parseFloat(arr[13]);
        stockInfo.lowestPrice    = scale * parseFloat( arr[14]);
        stockInfo.ceilingPrice   = scale * parseFloat(arr[15]);
        stockInfo.floorPrice     = scale * parseFloat(arr[16]);
        stockInfo.totalOfferQtty = parseInt(arr[17]);
        stockInfo.totalBidQtty   = parseInt(arr[18]);
        stockInfo.matchPrice     = scale * parseFloat(arr[19]);
        stockInfo.matchQtty      = parseInt(arr[20]);
        stockInfo.matchValue     = scale * parseFloat(arr[21]);
        stockInfo.averagePrice   = scale * parseFloat(arr[22]);
        stockInfo.bidPrice01     = scale * parseFloat(arr[23]);
        stockInfo.bidQtty01      = parseInt(arr[24]);
        stockInfo.bidPrice02     = scale * parseFloat(arr[25]);
        stockInfo.bidQtty02      = parseInt(arr[26]);
        stockInfo.bidPrice03     = scale * parseFloat(arr[27]);
        stockInfo.bidQtty03      = parseInt(arr[28]);
        stockInfo.offerPrice01   = scale * parseFloat(arr[29]);
        stockInfo.offerQtty01    = parseInt(arr[30]);
        stockInfo.offerPrice02   = scale * parseFloat(arr[31]);
        stockInfo.offerQtty02    = parseInt(arr[32]);
        stockInfo.offerPrice03   = scale * parseFloat(arr[33]);
        stockInfo.offerQtty03    = parseInt(arr[34]);

        return stockInfo;
    }

    /**
     * Get a list of companies on the market together with its stock code and
     * floorCode.
     *
     * @return {Promise<List<{code, floorCode, companyName}>>}
     */
    getCompanies() {
        return $.get(`http://${this.server}/priceservice/company/snapshot/`);
    }
}


module.exports = PriceService;
