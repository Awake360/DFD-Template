(function ($) {
	$("#presentation-acces-questionnaire").on('click', function (event) {
        event.preventDefault();

        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 600);
    });

    $('.reponse').hide();
    $('.question').hide();
    $('.question:first-child').show();

    $('.question-form').on('submit', function (event) {
    	event.preventDefault();

    	$(this).siblings('.reponse').slideDown();
    	$(this).slideUp();

    	if ($(this).closest('.question').next() .length === 0) {
    		$(this).closest('.question').find('.question-suivante').hide();
    	}
    });

    $('.question-suivante').on('click', function (event) {
    	if ($(this).closest('.question').next() .length > 0) {
	    	//Affichage question
	    	$(this).closest('.question').next().slideDown();
	    	$(this).closest('.question').slideUp();

	    	//Affichage le saviez vous
	    	$('.le-saviez-vous-texte').hide();
	    	$('#le-saviez-vous-texte-' + $(this).closest('.question').next().attr('id')).show();
	    }
    });
}(jQuery));
