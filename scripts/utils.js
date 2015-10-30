module.exports = {
    formatPrice(price) {
        if (price === 0) {
            return '';
        }
        return (price / 1000).toFixed(1);
    },

    formatQty(qty) {
        if (qty === 0) {
            return '';
        }
        // quantities from priceservice have already been divided by 10
        // this regex wont work for decimal numbers, but that's ok
        var formatted = (qty * 10).toString().replace(/(\d)(?=(?:[0-9]{3})+\b)/, '$1,');
        return formatted.substr(0, formatted.length - 1); // trim the last digit
    },
    }
}
