(function() {
    var floatedInputs = document.querySelectorAll('.field');
    var floatedSelects = document.querySelectorAll('.select');

    for (let input of floatedInputs) {
        input.classList.add('field_floating');
        input.addEventListener('change', changeLabeledInput);
    };

    for (let select of floatedSelects) {
        select.classList.add('select_floating');
        select.addEventListener('change', changeLabeledSelect);
    };

    function changeLabeledInput(evt) {
        if (evt.target.value == '') {
            evt.target.classList.remove('field__input_filled');
        } else {
            evt.target.classList.add('field__input_filled');
        };
    };

    function changeLabeledSelect(evt) {
        if (evt.target.value == '') {
            evt.target.classList.remove('select__input_filled');
        } else {
            evt.target.classList.add('select__input_filled');
        };
    };
})();