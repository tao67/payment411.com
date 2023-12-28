/*!
* So.cl script
* By sizeof(cat) https://sizeof.cat
* Released under the GPLv3
*/
document.addEventListener("DOMContentLoaded", function(event) {
	let socls = document.querySelectorAll('[data-socl]');
	socls.forEach(anchor => {
		anchor.addEventListener('mouseover', function() {
			let target = document.querySelector('.socl[data-socl-id="' + this.dataset.socl + '"]');
			if (target) {
				target.classList.add("pinned");
			}
		}, false);
		anchor.addEventListener('mouseout', function() {
			let target = document.querySelector('.socl[data-socl-id="' + this.dataset.socl + '"]');
			if (target) {
				target.classList.remove("pinned");
			}
		}, false);
	});
});