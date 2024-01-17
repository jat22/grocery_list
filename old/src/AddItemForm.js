
class AddItemForm {
	constructor(parentElementId, list){
		this.parentElement = document.getElementById(parentElementId);
		this.list = list;
	}

	static create(parentElementId, list){
		const newForm = new AddItemForm(parentElementId, list);
		newForm._createFormElement();
		return newForm
	}

	render(){
		this.parentElement.appendChild(this.form)
	}

	_createFormElement (){
		const form = document.createElement('form');
		
		this._createNameInput();
		this._createPriceInput();
		this._createAddButton();

		form.appendChild(this.nameInput);
		form.appendChild(this.priceInput);
		form.appendChild(this.addButton)

		this.form = form;
	}

	_createNameInput(){
		const nameInput = document.createElement('input');

		nameInput.id = 'name-input';
		nameInput.type = 'text';
		nameInput.placeholder = 'Name';
		nameInput.required = true;

		this.nameInput = nameInput;
	}

	_createPriceInput(){
		const priceInput = document.createElement('input');

		priceInput.id = 'new-price-input';
		priceInput.className = 'item-price';
		priceInput.type = 'number';
		priceInput.min = '0';
		priceInput.placeholder = 'Price';

		this.priceInput = priceInput
	}

	_validate(name, price){
		if(name.length === 0){
			alert('Item must have a name!')
			return false
		}
		if(price < 0){
			alert('Price must be 0 or greater!')
			return false
		}
		return true;
	}

	_createAddButton(){
		const button = document.createElement('button');
		button.textContent = 'Add Item'

		button.addEventListener('click', e => {
			this._handleAddButtonClick(e)
		});

		this.addButton = button
	}

	_handleAddButtonClick(e){
		e.preventDefault();
		const name = this.nameInput.value;
		const price = this.priceInput.value;
		if(this._validate(name, price)){
			this.list.addItem(name, price, this.list);
			this.priceInput.value = '';
			this.nameInput.value = '';
			this.domControl.renderCartUpdate();
		}
	}
}