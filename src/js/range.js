(function() {
	var rangeLine = document.querySelector('.range__slider'),
        rangeLineActive = document.querySelector('.range__slider-active'),
        rangeButton = document.querySelector('.range__button'),
        rangeInputs = document.querySelectorAll('.range__input');
        
    rangeButton.classList.remove('range__button_hided');

	rangeButton.addEventListener('mousedown', (evt) => {
		evt.preventDefault();

		document.addEventListener('mousemove', moveMouseHandler);
		document.addEventListener('mouseup', upMouseHandler);

		var currentPosition = evt.clientX;
		var buttonPosition = rangeButton.offsetLeft + 12;

		function moveMouseHandler(moveEvt) {
			moveEvt.preventDefault();

			var shift = moveEvt.clientX - currentPosition;
			var newPosition = buttonPosition + shift;

			if (newPosition >= 0 && newPosition <= rangeLine.offsetWidth) {
				setSlider(newPosition);
			};
		};

		function upMouseHandler(upEvt) {
			upEvt.preventDefault();

            document.removeEventListener('mousemove', moveMouseHandler);
            document.removeEventListener('mouseup', upMouseHandler);

            setTimeout(chooseLevel, 400);
		};
	});

	function setSlider(position) {
		if (position) {
            rangeButton.style.left = position + 'px';
            rangeLineActive.style.width = position + 'px';
		} else {
			rangeButton.style.left = '100%';
            rangeLineActive.style.width = '100%';
		};
    };
    
    function chooseLevel() {
        var position = Math.round(rangeButton.offsetLeft / rangeLine.offsetWidth * 100);
        if (position <= 25) {
            rangeInputs[0].checked = true;
        } else if (position <= 50) {
            rangeInputs[1].checked = true;
        } else if (position <= 75) {
            rangeInputs[2].checked = true;
        } else {
            rangeInputs[3].checked = true;
        };
        rangeButton.setAttribute('style', '');
        rangeLineActive.setAttribute('style', '');
    };
})();