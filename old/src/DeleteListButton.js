
class DeleteListButton {
	constructor(parentElementId, list){
		this.parentElement = document.getElementById(parentElementId)
		this.list = list
	}

	_createButton(){
		const button = document.createElement('button')
		button.textContent = 'Delete List'
		button.id = 'delete-list-button'

		button.addEventListener('click', e => {
			e.preventDefault();
			if(confirm('DELETE ALL ITEMS??')){
				this.list.deleteAllItems();
				domControl.renderCartUpdate();
			}
		})

		this.button = button
	}

	render(){
		this._createButton();
		this.parentElement.appendChild(this.button);
	}
}