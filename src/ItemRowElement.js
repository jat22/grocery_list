class ItemRowElement {
	constructor(item, domControl){
		this.item = item
		this.id = item?.id || null
		this.name = item?.name || null;
		this.price = item?.price || null;
		this.inCart = item?.inCart || null;
		this.domControl = domControl
	}

	static create(item, domControl){
		const newRow = new ItemRowElement(item, domControl);
		newRow._createElement()
		return newRow
	}

	_createElement(){
		const row = document.createElement('tr')
		row.id = this.id

		this._createCheckboxTd();
		this._createNameTd();
		this._createPriceTd();
		this._createDeleteTd();

		row.appendChild(this.checkboxTd);
		row.appendChild(this.nameTd);
		row.appendChild(this.priceTd);
		row.appendChild(this.deleteTd)
		this.element = row
	}

	_createNameTd(){
		const td = document.createElement('td')
		td.textContent = this.name;
		td.className = this.inCart ? 'in-cart' : 'not-in-cart';
		this.nameTd = td
	}

	_createCheckboxTd(){
		const td = document.createElement('td')
		const checkbox = document.createElement('input');

		checkbox.type = 'checkbox';
		checkbox.checked = this.inCart;

		checkbox.addEventListener('change', e => {
			if(checkbox.checked){
				this.item.addToCart();
			} else {
				this.item.removeFromCart();
			}
			this.domControl.renderCartUpdate();
		})

		td.appendChild(checkbox);

		this.checkboxTd = td;
	}

	_createPriceTd(){
		const td = document.createElement('td')
		const priceInput = document.createElement('input')

		priceInput.type = 'number';
		priceInput.value = this.price || 0;
		priceInput.disabled = this.inCart;
		priceInput.inputMode = 'numeric';
		priceInput.min = 0;
		priceInput.classList.add('price-field')

		priceInput.addEventListener('blur', e => {
			const target = e.target;
			this.item.updatePrice(target.value)
		})

		td.appendChild(priceInput);
		this.priceTd = td
	}

	_createDeleteTd(){
		const td = document.createElement('td')
		const deleteIcon = document.createElement('span');

		deleteIcon.classList.add("material-symbols-outlined")
		deleteIcon.classList.add("hover-effect")
		deleteIcon.textContent = 'delete'

		deleteIcon.addEventListener('click', e => {
			e.preventDefault();

			if(this.item.inCart){
				if(!confirm('Item will be removed from your cart and deleted from your list. Continue?')){
					return
				}
			}
			this.item.delete()
			this.domControl.renderCartUpdate();
		})

		td.appendChild(deleteIcon)
		this.deleteTd = td
	}
}
