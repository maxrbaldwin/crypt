module.exports = {
	downloadsOptions: {
		url: 'http://openstates.org/downloads/',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36'
		}
	},
	getFetchLinkOptions: function (link) {
		return {
			uri: link.link,
			encoding: null
		}
	},
	scrapeLinks: function ($, rows, filterBy) {

		let getLink = ($, el) => {
			let row = $(el);
			let tds = row.children('td');

			if(tds.length) {
				return {
					state: parseState($(tds[0]).text()),
					link: $(tds[1]).find('a').attr('href'),
				}
			}

			return null;
		}

		let parseState = (state) => {
			let splitState = state.split(' ');

			// if state name has two words. North Dakota
			if (splitState.length > 1) {
				return splitState.map(function(word, i){
					// if is last index in splitState return last word
					return (i + 1 === splitState.length ? word : `${word}-`)
				}).join('');
			}

			return state;
		}

		return rows.map(function(i, el) {
			let link = getLink($, el);

			if(filterBy && link && Array.isArray(filterBy)) {
				if(filterBy.includes(link.name)) {
					return link;
				}	
			}

			if(link) {
				return link;
			}

			return null;
		}).filter(function(link) {
			if(link) {
				return link;
			}
		});
	},
	getFileType: function (entryName) {
		return entryName.split('/')[0];
	}
}