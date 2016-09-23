$('document').ready(function() {
	function search() {
		var searchInput = $("input").val();
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&',
			data: { gsrsearch: searchInput},
			dataType: 'jsonp',
			success: function (responce) {
				var keys = [];
				$("main").empty();
				$("main").append("<h1>Results for " + searchInput + ":</h1>");
				if (responce.query) {
					keys = Object.keys(responce.query.pages);
				}
				for (var i = 0, len = keys.length; i < len; i++) {
					let article = responce.query.pages[keys[i]];
					$('main').append(`<div class="search-block">
										<a href="https://en.wikipedia.org/wiki/?curid=${article.pageid}"target="_blank">
											<h2>${article.title}</h2>
											<p>${article.extract}</p>
										</a>
									</div>`);
				}
				$(".search-block").hover(mouseEnterEffect, mouseLeaveEffect);
				//console.log(i, 'a');
				if (i === 0) {
					$('main').append(`<div class="search-block">
										<h2>Nothing Found</h2>
										<p>Oops! We could not find something relevant in Wikipedia.
											Check your input and try again.
										</p>
									</div>`);
				}
			}
		});
		$("input").val('');
	}

	function mouseEnterEffect() {
		$(this).css({'background-color': '#ff9', 'box-shadow': '1px 1px 10px 3px rgba(1, 1, 1, 0.5)'});
	}

	function mouseLeaveEffect() {
		$(this).css({'background-color': 'linen', 'box-shadow': 'none'});
	}

	$('input').on({
		focus: function() {
			$(this).animate({width: '14.3em'}, 250);
		},
		blur: function() {
			$(this).animate({width: '5em'}, 250);
		},
		keypress: function(e) {
			if(e.which == 13) {
				search();
				return false;
			}
		}
	});

	$("#search").click(search);
});