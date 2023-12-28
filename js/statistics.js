/*!
* Based on the original code by Jamie Tanna 
* https://www.jvt.me
* Modified by sizeof(cat) https://sizeof.cat
* Released under the MIT License
*/
document.addEventListener("DOMContentLoaded", function(event) {
	var labels = {
		hours: [
			"00:00",
			"01:00",
			"02:00",
			"03:00",
			"04:00",
			"05:00",
			"06:00",
			"07:00",
			"08:00",
			"09:00",
			"10:00",
			"11:00",
			"12:00",
			"13:00",
			"14:00",
			"15:00",
			"16:00",
			"17:00",
			"18:00",
			"19:00",
			"20:00",
			"21:00",
			"22:00",
			"23:00"
		],
		days: [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31"
		],
		week: [
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun"
		],
		months: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		years: [
			"2015",
			"2016",
			"2017",
			"2018",
			"2019",
			"2020",
			"2021",
			"2022",
			"2023"
		],
		words: [
			"0-25",
			"26-50",
			"51-70",
			"71-100",
			"101-200",
			"201-300",
			"301-400",
			"401-500",
			"501-1000",
			"1001-1500",
			"1501+"
		]
	};
	function generateDataset(obj, config, fill, tension, hide) {
		var values = []
		for(var key in obj) {
			values.push(obj[key]);
		}
		return {
			label: config.label,
			data: values,
			borderWidth: 1,
			borderColor: config.borderColor,
			backgroundColor: config.backgroundColor,
			fill: fill,
			pointRadius: 2,
			lineTension: tension,
			hidden: hide && config.label == 'so.cl' ? true : false
		};
	}
	function renderGraph(canvasId, labels, datasets, chart_type) {
		new Chart(document.getElementById(canvasId), {
			type: chart_type,
			data: {
				labels: labels,
				datasets: datasets
			},
			options: {
				responsive: true,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}
	fetch('/statistics.json')
		.then(res => res.json())
		.then((theData) => {
			var config = {
				post: {
					borderColor: 'rgba(74, 149, 41, 0.8)',
					backgroundColor: 'rgba(74, 149, 41, 0.8)',
					label: 'Posts'
				},
				music: {
					borderColor: 'rgba(247,185,0, 0.8)',
					backgroundColor: 'rgba(247,185,0, 0.8)',
					label: 'Music'
				},
				link: {
					borderColor: 'rgba(246, 0, 2, 0.8)',
					backgroundColor: 'rgba(246, 0, 2, 0.8)',
					label: 'Links'
				},
				photo: {
					borderColor: 'rgba(69, 148, 230, 0.8)',
					backgroundColor: 'rgba(69, 148, 230, 0.8)',
					label: 'Photos'
				},
				review: {
					borderColor: 'rgba(47, 74, 251, 0.8)',
					backgroundColor: 'rgba(47, 74, 251, 0.8)',
					label: 'Reviews'
				},
				'so.cl': {
					borderColor: 'rgba(237, 25, 128, 0.8)',
					backgroundColor: 'rgba(237, 25, 128, 0.8)',
					label: 'so.cl'
				},
				project: {
					borderColor: 'rgba(75, 234, 142, 0.8)',
					backgroundColor: 'rgba(75, 234, 142, 0.8)',
					label: 'Projects'
				}
			}
			var hours = [];
			var days = [];
			var week = [];
			var months = [];
			var years = [];
			var words = [];
			var wordsyears = [];
			for (var postType in config) {
				if (config.hasOwnProperty(postType)) {
					hours.push(generateDataset(theData[postType].h, config[postType], false, 0.4, false));
					// TODO days should be indexed from 1
					days.push(generateDataset(theData[postType].dc, config[postType], false, 0.4, false));
					week.push(generateDataset(theData[postType].w, config[postType], false, 0.4, false));
					months.push(generateDataset(theData[postType].m, config[postType], false, 0.4, false));
					years.push(generateDataset(theData[postType].y, config[postType], false, 0.4, false));
					words.push(generateDataset(theData[postType].wo, config[postType], false, 0.4, false));
					if (postType !== 'project' &&postType !== 'photo') {
						wordsyears.push(generateDataset(theData[postType].yw, config[postType], false, 0.4, false));
					}
				}
			}
			renderGraph('chart-hours', labels.hours, hours, 'line');
			renderGraph('chart-days', labels.days, days, 'line');
			renderGraph('chart-week', labels.week, week, 'line');
			renderGraph('chart-months', labels.months, months, 'line');
			renderGraph('chart-years', labels.years, years, 'bar');
			renderGraph('chart-words', labels.words, words, 'bar');
			renderGraph('chart-wordsyears', labels.years, wordsyears, 'bar');
		})
		.catch(err => {
			throw err
		});
});
