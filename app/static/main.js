(function() {
	'use strict'

	function createHeaderField(fieldsNames){

		var trItem = document.createElement('tr')

		for (name in fieldsNames) {
			var thItem = document.createElement('th')
			thItem.innerText = name
			trItem.appendChild(thItem)
		}
		table.appendChild(trItem)
	}


	function createTableFields(data, fieldsNames){
		var trItem = document.createElement('tr')
		for (var i in fieldsNames) {
			var tdItem = document.createElement('td')
			tdItem.innerText = data[i]
			trItem.appendChild(tdItem)
		}
		table.appendChild(trItem)
	}


	function getData(url) {
		var req = new XMLHttpRequest
		req.open('GET', url)

		req.addEventListener('readystatechenge', function(){
			if (req.readyState == 4 && req.status === 200){
				return json.parse(req.responseText)
			}
		})
		
	}


	var fieldsNames = getData('/table/main/fieldsnames')
	var data = getData('/table/main/data')

	var table = document.getElementsByClassName('table__main')[0]
	createHeaderField(fieldsNames)
	createTableFields(data, fieldsNames)

}());