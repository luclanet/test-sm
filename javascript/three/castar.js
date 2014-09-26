var Castar = function() {
	var fn = [];

	var currency = [];
	var default_currency;
	var active_currency;
	var events = [];

	fn.add = function(currency_code, settings) {
		currency[currency_code] = settings;
		fn._call_event("add",currency[currency_code]);
	}
	fn.remove = function(currency_code) {
		currency.splice(currency_code, 1);
		fn._call_event("remove",currency[currency_code]);
	}
	fn.rate = function(currency_code, rate) {
		if (typeof currency[currency_code] == "undefined") throw "Currency not set";
		else {
			if (typeof currency[currency_code]['rate'] != "undefined")
				var old = currency[currency_code]['rate'];
			currency[currency_code]['rate'] = rate;
			if (typeof old == "undefined")
				fn._call_event("rate-added",currency[currency_code]);
			else
				fn._call_event("rate-updated",currency[currency_code], old, currency[currency_code]['rate']);
		}
	}
	fn.base = function(currency_code) {
		if (typeof currency[currency_code] == "undefined") throw "Currency not set";
		else {
			default_currency = currency_code;
			currency[currency_code]['rate'] = 1;
			fn._call_event("base",currency[currency_code]);
		}
	}
	fn.activate = function(currency_code) {
		if (typeof currency[currency_code] == "undefined") throw "Currency not set";
		else {
			if (typeof active_currency != "undefined")
				var old = active_currency;
			active_currency = currency_code;
			if (typeof old != "undefined")
				fn._call_event("switch",currency[old],currency[currency_code]);
			else
				fn._call_event("activate",currency[currency_code]);
		}
	}
	fn.calculate = function(amount, from, to) {
		if (typeof from == "undefined")
			var from = default_currency;
		if (typeof to == "undefined")
			var to = active_currency;
		if (typeof currency[from] == "undefined" || typeof currency[to] == "undefined") throw "Currency not set";
		else {
			var tmp_amount = amount * (currency[to]['rate'] / currency[from]['rate']);
			fn._call_event("calculate", amount, currency[from], tmp_amount);
			return tmp_amount;
		}
	}
	fn.display = function(amount, from, to) {
		if (typeof from == "undefined")
			var from = default_currency;
		if (typeof to == "undefined")
			var to = active_currency;
		if (typeof currency[from] == "undefined" || typeof currency[to] == "undefined") throw "Currency not set";
		else {
			var tmp_amount = amount * (currency[to]['rate'] / currency[from]['rate']);
			var amount_html = currency[to]['symbol']+tmp_amount.toFixed(currency[to]['decimals']);
			fn._call_event("display", amount, currency[from], tmp_amount);
			return amount_html;
		}
	}
	fn.auto = function(action) {
		if (typeof action == "undefined" || action == "on") {
			var elements = document.getElementsByClassName("castar");
			for (i = 0; i < elements.length; i++) {
				if (elements[i].hasAttribute("data-original-value"))
					var amount = elements[i].getAttribute("data-original-value");
				else
					var amount = elements[i].innerHTML;

				if (!isNaN(parseFloat(amount)) && isFinite(amount)) {
					elements[i].setAttribute("data-original-value",amount);
	
					if (elements[i].hasAttribute("data-from-currency"))
						var from = elements[i].getAttribute("data-from-currency");
					else
						var from = default_currency;
	
					if (elements[i].hasAttribute("data-currency"))
						var to = elements[i].getAttribute("data-currency");
					else
						var to = active_currency;

					if (typeof currency[from] == "undefined" || typeof currency[to] == "undefined") throw "Currency not set";
					else {
						elements[i].innerHTML = fn.display(amount, from, to);
						fn._call_event("update");
						fn._call_event("auto-on");
					}
				}
			}
		}
		else if (action == "off") {
			var elements = document.getElementsByClassName("castar");
			for (i = 0; i < elements.length; i++) {
				if (elements[i].hasAttribute("data-original-value"))
					elements[i].innerHTML = elements[i].getAttribute("data-original-value");

				fn._call_event("update");
				fn._call_event("auto-off");
			}
		}
	}

	fn.on = function(action, fun) {
		if (typeof events[action] == "undefined") events[action] = [];
		events[action][0] = fun;
	};
	fn._call_event = function(action, var1, var2, var3) {
		if (typeof events[action] != "undefined") {
			for (i = 0; i < events[action].length; i++) {
				var fun = events[action][i];
				fun(var1, var2, var3);
			}
		}
	};

	return fn;
}
