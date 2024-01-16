class ListTableElement {
	constructor(list, parentId, inCartList, domControl = null){
		this.listItems = list.items;
		this.parentElement = document.getElementById(parentId);
		this.rows = [];
		this.inCartList = inCartList;
		this.domControl = domControl;
	}

	render(){
		this.parentElement.innerHTML = '';
		this.resetTable();
		this._createListTable()
		this.parentElement.appendChild(this.tableElement)
	}

	_createTableElement(){
		const table = document.createElement('table')
		const colGroup = document.createElement('colgroup');
		this._columnIds.forEach(col => {
			const colElement = document.createElement('col');
			colElement.id = col;
			colGroup.appendChild(colElement);
		})
		table.appendChild(colGroup)

		const tableHead = document.createElement('thead');
		const headRow = document.createElement('tr');
		['', 'Item', 'Price', ''].forEach(th => {
			const thElement = document.createElement('th')
			thElement.textContent = th
			headRow.appendChild(thElement);
		})
		tableHead.appendChild(headRow);

		table.appendChild(tableHead)

		this.tableElement = table;
	}

	_createTableBodyElement(){
		this.tableBodyElement = document.createElement('tbody')
	}

	_createRowElements(){
		for(let item of this.listItems){
			if(item && item.inCart === this.inCartList){
				const itemRow = ItemRowElement.create(item, this.domControl)
				this.rows.push(itemRow.element)
			}
		}
	}

	_createListTable(){
		this._createTableElement();
		this._createRowElements();
		this._createTableBodyElement();

		this.rows.forEach(row => {
			this.tableBodyElement.appendChild(row)
		})

		this.tableElement.appendChild(this.tableBodyElement)
	}

	_removeAllTableRows(){
		this.tableBodyElement.innerHTML = ''
	}

	resetTable(){
		delete this.tableElement;
		delete this.tableBodyElement;
		this.rows.length = 0;
	}

	_columnIds = ['checkbox-col', 'name-col', 'price-col', 'delete-col']
}