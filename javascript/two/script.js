(function(){
	var html = "";
	for (i=1; i<=100; i++) {
		if (i != 1 && isPrime(i)) html += i + " (prime)<br>"; // http://en.wikipedia.org/wiki/1_(number)
		else if (i % 3 == 0 && i % 5 == 0) html += 'FizzBuzz<br>';
		else if (i % 3 == 0) html += 'Fizz<br>';
		else if (i % 5 == 0) html += 'Buzz<br>';
		else html += i + "<br>";
	}
	document.getElementsByTagName("body")[0].innerHTML = html;

	function isPrime(num) {
		var result = true;
		if (num !== 2) {
			if (num % 2 == 0) {
				result = false;
			} else {
				for (x=3; x<=Math.sqrt(num); x+=2) {
					if (num % x == 0) result = false;
				}
			}
		}
		return result;
	}
})();
