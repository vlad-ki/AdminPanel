(function() {
	'use strict'

	function createHeaderField(fieldsNames){

		var trItem = document.createElement('tr')
		fieldsNames.unshift('e')

		for (name in fieldsNames) {
			var thItem = document.createElement('th')
			thItem.innerText = fieldsNames[name]
			trItem.appendChild(thItem)
		}
		table.appendChild(trItem)
	}


	function createTableFields(data, fieldsNames){
		for (var line in data) {
			var aItem = document.createElement('a')
			var trItem = document.createElement('tr')

			aItem.setAttribute('href', editUrl + data[line].id )
			aItem.innerText = 'e'
			trItem.appendChild(aItem)

			for (var fieldName in fieldsNames) {
				var tdItem = document.createElement('td')

				tdItem.innerText = data[line][fieldsNames[fieldName]]
				trItem.appendChild(tdItem)
			}
			table.appendChild(trItem)
		}
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

	// fieldsNames is an Array witch containst fealds names for main table
	/*
	 data is an array of objects witch contaist maps like {'id': 'idValue', fiel_name1': 'value1', fiel_nameN': 'valueN', ...}
	 the id is a unique identifer of the note in DB
	*/
	var fieldsNames = getData('/table/main/fieldsnames')
	var data = getData('/table/main/data')
	var editUrl = '/crud/edit/'
	var table = document.getElementsByClassName('table__main')[0]
	
	createHeaderField()
	createTableFields()

}());