

class CartTotalElement {
	constructor(parentElementId, list){
		this.list = list;
		this.parentElement = document.getElementById(parentElementId);
	}

	static create(parentElementId, list){
		const newCartTotalElement = new CartTotalElement(parentElementId, list);
		newCartTotalElement._createElement();
		return newCartTotalElement;
	}

	render(){
		this._updateContent();
		this.parentElement.appendChild(this.element)
	}

	_updateContent(){
		this.element.textContent = `Cart Total: $${this.list.cartTotal.toFixed(2)}`
	}

	_createElement(){
		const element = document.createElement('h3');
		this.element = element;
	}

}