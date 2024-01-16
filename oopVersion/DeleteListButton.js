
class DeleteListButton {
	constructor(parentElementId, list){
		this.parentElement = document.getElementById(parentElementId)
		this.list = list
	}

	_createButton(){
		const button = Element.create('button')
		button.textContent = 'Delete List'
		button.id = 'delete-list-button'

		button.addEventListener('click', e => {
			e.preventDefault();
			this.list.deleteAllItems();
			domControl.renderListTables();
		})

		this.button = button
	}

	render(){
		this._createButton();
		this.parentElement.appendChild(this.button);
	}
}