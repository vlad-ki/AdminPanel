(function() {
	'use strict'

	function createHeaderField(tableFieldsNames){

		var trItem = document.createElement('tr')
		tableFieldsNames.unshift('e')

		for (name in tableFieldsNames) {
			var thItem = document.createElement('th')
			thItem.innerText = tableFieldsNames[name]
			trItem.appendChild(thItem)
		}
		tableElement.appendChild(trItem)
	}


	function createTableFields(tableData, tableFieldsNames){
		for (var line in tableData) {
			var aItem = document.createElement('a')
			var trItem = document.createElement('tr')

			aItem.setAttribute('href', editUrl + tableData[line].id )
			aItem.innerText = 'e'
			trItem.appendChild(aItem)

			for (var fieldName in tableFieldsNames) {
				var tdItem = document.createElement('td')

				tdItem.innerText = tableData[line][tableFieldsNames[fieldName]]
				trItem.appendChild(tdItem)
			}
			tableElement.appendChild(trItem)
		}
	}


	function getTableData(url) {
		var req = new XMLHttpRequest
		req.open('GET', url)

		req.addEventListener('readystatechenge', function(){
			if (req.readyState == 4 && req.status === 200){
				return json.parse(req.responseText)
			}
		})
		
	}

	// tableFieldsNames is an Array which containst fealds names for main table
	/*
	 tableData is an array of objects which contaist maps like 
	 {'id': 'idValue', fiel_name1': 'value1', fiel_nameN': 'valueN', ...}
	 the id is a unique identifer of the note in DB
	*/
	var tableFieldsNames = getTableData('/table/main/tableFieldsnames')
	var tableData = getTableData('/table/main/tableData')
	var editUrl = '/crud/edit/'
	var tableElement = document.getElementsByClassName('table__main')[0]

	createHeaderField()
	createTableFields()

}());
