class ListTableElement {
	constructor(list, parentId, inCartList){
		this.listItems = list.items;
		this.parentElement = document.getElementById(parentId);
		this.rows = [];
		this.inCartList = inCartList;
	}

	createTableElement(){
		const table = Element.create('table')
		const colGroup = Element.create('colgroup');
		['checkbox-col', 'name-col', 'price-col', 'delete-col'].forEach(col => {
			const colElement = Element.create('col');
			colElement.id = col;
			colGroup.appendChild(colElement);
		})
		table.appendChild(colGroup)

		const tableHead = Element.create('thead');
		const headRow = Element.create('tr');
		['', 'Item', 'Price', ''].forEach(th => {
			const thElement = Element.create('th')
			thElement.textContent = th
			headRow.appendChild(thElement);
		})
		tableHead.appendChild(headRow);

		table.appendChild(tableHead)

		this.tableElement = table;
	}

	createTableBodyElement(){
		this.tableBodyElement = Element.create('tbody')
	}

	createRowElements(){
		for(let item of this.listItems){
			if(item && item.inCart === this.inCartList){
				const itemRow = new ItemRowElement(item)
				itemRow.createElement()
				this.rows.push(itemRow.element)
			}
		}
	}

	createListTable(){
		this.createTableElement();
		this.createRowElements();
		this.createTableBodyElement();

		this.rows.forEach(row => {
			this.tableBodyElement.appendChild(row)
		})

		this.tableElement.appendChild(this.tableBodyElement)
	}

	removeAllTableRows(){
		this.tableBodyElement.innerHTML = ''
	}

	resetTable(){
		delete this.tableElement;
		delete this.tableBodyElement;
		this.rows.length = 0;
	}

	render(){
		this.parentElement.innerHTML = '';
		this.resetTable();
		this.createListTable()
		this.parentElement.appendChild(this.tableElement)
	}
}