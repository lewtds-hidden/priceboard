module.exports = {
    formatPrice(price) {
        return "" + (price / 1000);
    },

    formatQty(qty) {
        return "" + (qty / 100);
    }
}
