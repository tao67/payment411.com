/*!
* Tabs script
* By sizeof(cat) https://sizeof.cat
* Released under the GPLv3
*/
document.addEventListener("DOMContentLoaded", function(event) {
	$('.tabs-1 ul li').click(function() {
		let tab_id = $(this).attr('data-tab');
		$('.tabs-1 ul li').removeClass('current');
		$('.tabs-1 .tab-content').removeClass('current');
		$(this).addClass('current');
		$("#" + tab_id).addClass('current');
	});
	$('.tabs-2 ul li').click(function() {
		let tab_id = $(this).attr('data-tab');
		$('.tabs-2 ul li').removeClass('current');
		$('.tabs-2 .tab-content').removeClass('current');
		$(this).addClass('current');
		$("#" + tab_id).addClass('current');
	});
});
