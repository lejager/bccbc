var helper = {
	round : function(num) {
		if (num % 1 !== 0) {
			return num.toFixed(2);
		} else {
			return num;
		}
	},

	quantify : function(items) { // takes array
		Object.keys(items).map(function(key) {
			let size = items[key].Size;
			let price = items[key].Price;
			let quantity = parseInt(size, 10);
			items[key].Quantity = quantity;
			items[key].PricePer = (price / quantity).toFixed(2);
			items[key].TotalOrdered = 0;
		});
		return items;
	} 
};

module.exports = helper;