/*!
* Based on the original code by Jamie Tanna 
* https://www.jvt.me
* Modified by sizeof(cat) https://sizeof.cat
* Released under the MIT License
*/
document.addEventListener("DOMContentLoaded", function(event) {
	let lunrIndex;
	let feed;
	document.addEventListener('click', function (event) {
		if (!event.target.matches('.search-clean')) {
			return;
		}
		update_feed();
		event.preventDefault();
	}, false);
	document.querySelector('.site-search').onkeyup = function() {
		const value = document.querySelector('.site-search').value;
		const searches_element = document.querySelector('.search-results');
		let li;
		if (value != '' && value != ' ') {
			var results = lunrIndex.search(value);
			if (0 === results.length) {
				searches_element.innerHTML = '';
				li = document.createElement('li');
				li.appendChild(document.createTextNode("No search results found."));
				searches_element.appendChild(li);
			} else {
				searches_element.innerHTML = '';
				results.forEach(function(result) {
					li = document.createElement('li');
					let anchor = document.createElement('a');
					anchor.href = result.ref;
					anchor.innerText = title_from_url(result.ref);
					li.appendChild(anchor);
					searches_element.appendChild(li);
				});
			}
		}
	}
	async function update_feed() {
		await fetch_feed();
		sessionStorage.setItem('jsonFeed', JSON.stringify(feed));
		sessionStorage.setItem('jsonFeed-updated', (new Date()));
		init();
	}
	function init() {
		const el = document.querySelector('.search-updated');
		if (sessionStorage.getItem('jsonFeed')) {
			feed = JSON.parse(sessionStorage.getItem('jsonFeed'));
			lastUpdated = sessionStorage.getItem('jsonFeed-updated');
			if (null != lastUpdated) {
				el.innerHTML = '<a href="#" class="search-clean">Reindex</a> your web browser search cache.';
			}
		} else {
			update_feed();
		}
		lunrIndex = lunr(function() {
			const search_el = document.querySelector('.site-search');
			search_el.removeAttribute('disabled');
			search_el.setAttribute('placeholder', 'Enter your search query');
			this.ref('u');
			this.field('t');
			this.field('s');
			if (feed) {
				feed.items.forEach(function (doc) {
					this.add(doc);
				}, this);
			}
		});
	}
	function fetch_feed() {
		return fetch('/search.json')
			.then(res => res.json())
			.then((theFeed) => {
				feed = theFeed;
			})
			.catch(err => {
				throw err
			});
	}
	function title_from_url(url) {
		var title = 'Title for post not found';
		feed.items.forEach(function(doc) {
			if (url === doc.u) {
				title = doc.t;
			}
		});
		return title;
	}
	init();
});
