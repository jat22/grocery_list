class ItemRowElement {
	constructor(item){
		this.item = item
		this.id = item?.id || null
		this.name = item?.name || null;
		this.price = item?.price || null;
		this.inCart = item?.inCart || null;
	}

	createElement(){
		const row = Element.create('tr')
		row.id = this.id

		this.createCheckboxTd();
		this.createNameTd();
		this.createPriceTd();
		this.createDeleteTd();

		row.appendChild(this.checkboxTd);
		row.appendChild(this.nameTd);
		row.appendChild(this.priceTd);
		row.appendChild(this.deleteTd)
		this.element = row
	}

	createNameTd(){
		const td = Element.create('td')
		td.textContent = this.name;
		td.className = this.inCart ? 'in-cart' : 'not-in-cart';
		this.nameTd = td
	}

	createCheckboxTd(){
		const td = Element.create('td')
		const checkbox = Element.create('input');

		checkbox.type = 'checkbox';
		checkbox.checked = this.inCart;

		checkbox.addEventListener('change', e => {
			if(checkbox.checked){
				this.item.listMethod(addItemToCart, this.id)
			} else {
				this.item.listMethod(removeItemFromCart, this.id)
			}
		})

		td.appendChild(checkbox);

		this.checkboxTd = td;
	}

	createPriceTd(){
		const td = Element.create('td')
		const priceInput = Element.create('input')

		priceInput.type = 'number';
		priceInput.value = this.price || 0;
		priceInput.disable = this.inCart;
		priceInput.inputMode = 'numeric';
		priceInput.min = 0;

		priceInput.addEventListener('blur', e => {
			const target = e.target;
			this.item.updatePrice(target.value)
		})

		td.appendChild(priceInput);
		this.priceTd = td
	}

	createDeleteTd(){
		const td = Element.create('td')
		const deleteButton = Element.create('button');

		deleteButton.textContent = 'X';
		deleteButton.className = 'remove-button'

		deleteButton.addEventListener('click', e => {
			e.preventDefault();
			this.item.listMethod(deleteItem, this.id)
		})

		td.appendChild(deleteButton)
		this.deleteTd = td
	}
}