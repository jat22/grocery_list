

class CartTotalElement {
	constructor($parentElement, list){
		this.list = list;
		this.$parentElement = $parentElement
	}

	static create($parentElement, list, heading){
		const newElement = new CartTotalElement($parentElement, list, heading);
		newElement.$p = newElement._generateMarkUp();
		newElement._render()
		return newElement
	}

	updateDOM(){
		$('.cart-total').find('.total-price').remove();
		this.$p = this._generateMarkUp();
		this._render();
	}

	_render(){
		this.$parentElement.append(this.$p)
	}

	_generateMarkUp(){
		return $(`
			<span class="header-text total-price">${this._formattedCartTotal()}</p>
		`)
	}

	_formattedCartTotal(){
		return `$${this.list.cartTotal?.toFixed(2) || 0.00}`
	}
}