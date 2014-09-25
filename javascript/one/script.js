(function(){
	document.getElementsByTagName("form")[0].addEventListener("submit", function(e){
		if (document.getElementById("text").value.length == 0) {
			alert("String is empty");
			e.preventDefault();
		}
		else if (document.getElementById("text").value.length > 255) {
			alert("String is longer of 255 characters");
			e.preventDefault();
		}
		else if (document.getElementById("text").value.indexOf("palindrome") !== -1) {
			alert("There is the word 'palindrome'");
			e.preventDefault();
		}
		else {
			if (document.getElementById("text").value == document.getElementById("text").value.split('').reverse().join('')) {
				alert("Aaaahhhrrrggg! A palindrome! I hate them!");
				e.preventDefault();
			}
		}
	});
})();
