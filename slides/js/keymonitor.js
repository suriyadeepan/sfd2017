document.onkeydown = function (e) {
		var n = 39;
		var p = 37;
    e = e || window.event;
		if (e.keyCode == n && sketchId < numSketches){
			location.href=(sketchId+1).toString() + ".html";
		}
		else if (e.keyCode == p && sketchId > 1){
			location.href=(sketchId-1).toString() + ".html";
		}
};
