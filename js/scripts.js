(function ($) {
    var questionNextLabel = $('.question-suivante').attr('value');

    $("#presentation-wrapper").css({backgroundSize: "cover"});
    $("#le-saviez-vous-header").css({backgroundSize: "cover"});

    function updateButtons() {
        //Afficher ou non "question suivante"
        if ($('.current-question').next('.question').length === 0) {
            $('.question-suivante').addClass('gotoform');

            $('.question-suivante').attr('value', 'Participer au jeu concours');
        } else {
            $('.question-suivante').removeClass('gotoform');

            $('.question-suivante').attr('value', questionNextLabel);
        }

        //Afficher ou non "question précédente"
        if ($('.current-question').prev('.question').length === 0) {
            $('.question-precedente').addClass('disabled');
        } else {
            $('.question-precedente').removeClass('disabled');
        }
    }

	//Smooth scroll
	$("#presentation-acces-questionnaire").on('click', function (event) {
        event.preventDefault();

        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 600);
    });

	//Initialisation questions/reponses
    $('.reponse').hide();
    $('.question').hide();
    $('#jeu-concours').hide();
    $('.question:first-child').show().addClass('current-question');
    $('.le-saviez-vous-texte').hide();
    $('.le-saviez-vous-texte').first().show();
    $('.question-suivante').addClass('disabled');

    updateButtons();

    //Valider la réponse
    $('.question-form').on('submit', function (event) {
    	event.preventDefault();

    	$(this).slideUp();

        $(this).siblings('.reponse').show().addClass('animated fadeInUp');

        $('.question-suivante').removeClass('disabled');

        var goodone = $(this).siblings('.reponse').attr('data-goodone');
        var reponse = $(this).find('input:checked').attr('value');

        if (goodone == reponse) {
            $(this).siblings('.reponse').find('.reponse-utilisateur').html('<span class="green">Bonne réponse ! <img src="./img/bonne-reponse.png" alt="Bonne réponse !" /></span>').addClass('animated bounceIn');
            // $(this).siblings('.reponse').find('.reponse-utilisateur').html('<span class="green"><img src="./img/tmp-bonne-reponse.png" alt="Bonne réponse !" /></span>').addClass('animated bounceIn');
        } else {
            $(this).siblings('.reponse').find('.reponse-utilisateur').html('<span class="red">Mauvaise réponse ! <img src="./img/mauvaise-reponse.png" alt="Mauvaise réponse !" /></span>').addClass('animated bounceIn');
            // $(this).siblings('.reponse').find('.reponse-utilisateur').html('<span class="red"><img src="./img/tmp-mauvaise-reponse.png" alt="Mauvaise réponse !" /></span>').addClass('animated bounceIn');
        }
    });

    //Question suivante
    $('.question-suivante').on('click', function (event) {
    	event.preventDefault();

    	if ($('.current-question').next('.question').length > 0 && !$(this).hasClass('gotoform') && !$(this).hasClass('disabled')) {
    		$('.current-question').next('.question').find('.question-form').show();
    		$('.current-question').next('.question').find('.reponse').hide();
            $('.question-suivante').addClass('disabled');

	    	//Affichage question
	    	$('.current-question').next('.question').slideDown('slow');
	    	$('.current-question').slideUp('slow', function() {
                var nextQuestion = $('.current-question').next('.question');
                $('.current-question').removeClass('current-question');
                nextQuestion.addClass('current-question');

                updateButtons();
            });

	    	//Affichage le saviez vous
	    	$('.le-saviez-vous-texte').hide();
	    	$('#le-saviez-vous-texte-' + $('.current-question').next('.question').attr('id')).show();
	    } else if ($(this).hasClass('gotoform') && !$(this).hasClass('disabled')) {
            $('#questions').hide();
            $('#le-saviez-vous').hide();
            $('#jeu-concours').show();
        }
    });

    //Question précédente
    $('.question-precedente').on('click', function (event) {
    	event.preventDefault();

    	if ($('.current-question').prev('.question').length > 0 && !$(this).hasClass('gotoform') && !$(this).hasClass('disabled')) {
    		$('.current-question').prev('.question').find('.question-form').show();
    		$('.current-question').prev('.question').find('.reponse').hide();
            $('.question-suivante').addClass('disabled');

	    	//Affichage question
	    	$('.current-question').prev('.question').slideDown('slow');
	    	$('.current-question').slideUp('slow', function() {
                var prevQuestion = $('.current-question').prev();
                $('.current-question').removeClass('current-question');
                prevQuestion.addClass('current-question');

                updateButtons();
            });

	    	//Affichage le saviez vous
	    	$('.le-saviez-vous-texte').hide();
	    	$('#le-saviez-vous-texte-' + $('.current-question').prev('.question').attr('id')).show();
	    }
    });

    //Pimp my website
    new WOW().init();

    //Popins
    $('#reglement').hide();
    $('.consulter-reglement').on('click', function (event) {
        event.preventDefault();


    });

    $('.consulter-reglement').fancybox({
        maxWidth    : 800,
        maxHeight   : 600,
        fitToView   : false,
        width       : '70%',
        height      : '70%',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none'
    });
}(jQuery));
