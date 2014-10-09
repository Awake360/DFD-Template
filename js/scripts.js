(function ($) {
	//Smooth scroll
	$("#presentation-acces-questionnaire").on('click', function (event) {
        event.preventDefault();

        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 600);
    });

	//Initialisation questions/reponses
    $('.reponse').hide();
    $('.question').hide();
    $('.question:first-child').show();

    //Valider la réponse
    $('.question-form').on('submit', function (event) {
    	event.preventDefault();

        $(this).siblings('.reponse').slideDown();
    	// $(this).siblings('.reponse').addClass('animated bounceOutLeft');

    	$(this).slideUp('fast', function() {
            var goodone = $(this).siblings('.reponse').attr('data-goodone');
            var reponse = $(this).find('input:checked').attr('value');

            if (goodone == reponse) {
                $(this).siblings('.reponse').find('.reponse-utilisateur').html('<span class="green">Bonne réponse</span>').addClass('animated bounceIn');
            } else {
                $(this).siblings('.reponse').find('.reponse-utilisateur').html('<span class="red">Mauvaise réponse</span>').addClass('animated bounceIn');
            }
        });

    	//Afficher ou non "question suivante"
    	if ($(this).closest('.question').next() .length === 0) {
    		$(this).closest('.question').find('.question-suivante').hide();
    	} else {
    		$(this).closest('.question').find('.question-suivante').show();
    	}
    });

    //Question suivante
    $('.question-suivante').on('click', function (event) {
    	event.preventDefault();

    	if ($(this).closest('.question').next() .length > 0) {
    		//Mise en forme question précédente
    		$(this).closest('.question').next().find('.question-form').show();
    		$(this).closest('.question').next().find('.reponse').hide();

	    	//Affichage question
	    	$(this).closest('.question').next().slideDown();
	    	$(this).closest('.question').slideUp();

	    	//Affichage le saviez vous
	    	$('.le-saviez-vous-texte').hide();
	    	$('#le-saviez-vous-texte-' + $(this).closest('.question').next().attr('id')).show();
	    }
    });

    //Question précédente
    $('.question-precedente').first().hide();

    $('.question-precedente').on('click', function (event) {
    	event.preventDefault();

    	if ($(this).closest('.question').prev() .length > 0) {
    		//Mise en forme question précédente
    		$(this).closest('.question').prev().find('.question-form').show();
    		$(this).closest('.question').prev().find('.reponse').hide();

	    	//Affichage question
	    	$(this).closest('.question').prev().slideDown();
	    	$(this).closest('.question').slideUp();

	    	//Affichage le saviez vous
	    	$('.le-saviez-vous-texte').hide();
	    	$('#le-saviez-vous-texte-' + $(this).closest('.question').prev().attr('id')).show();
	    }
    });

    //Pimp my website
    new WOW().init();
}(jQuery));
