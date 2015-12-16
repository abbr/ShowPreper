'use strict';

module.exports = {
	// TODO: may want to make the square larger even...
	fitSquare: function(desiredWidth, desiredHeight, width, height) {
		var finalWidth = desiredWidth;
		var finalHeight = desiredHeight;

		if (finalWidth > width) {
			var scale = width / finalWidth;
			finalWidth = width * scale;
			finalHeight = height * scale;
		}

		if (finalHeight > height) {
			var scale =  height / finalHeight;
			finalHeight = height * scale;
			finalWidth = width * scale;
		}

		return {
			width: finalWidth,
			height: finalHeight
		};
	},

	getFitSquareScaleFactor: function(desiredWidth, desiredHeight, width, height) {
		var xScale = width / desiredWidth;
		var yScale = height  / desiredHeight;

		var newHeight = desiredHeight * xScale;
		if (newHeight > height) {
			var scale = yScale;
		} else {
			var scale = xScale;
		}

		return scale;
	},

	centerSquare: function(innerWidth, innerHeight, outerWidth, outerHeight) {
		var left = (outerWidth - innerWidth) / 2;
		var top = (outerHeight - innerHeight) / 2;

		return {
			top: top,
			left: left
		};
	}
}