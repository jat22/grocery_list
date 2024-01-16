
class ItemForm {
	constructor(nameId, priceId){
		this.nameField = document.getElementById(nameId);
		this.priceField = document.getElementById(priceId);
	}
	get priceValue (){
		return this.priceField.value
	}

	get nameValue (){
		return this.nameField.value
	}

	validate(){
		const nameValue = this.nameField.value
		const priceValue = this.priceField.value
		if(nameValue.length === 0){
			alert('Item must have a name.')
			return false
		}
		if(priceValue < 0){
			alert('Price must be zero or greater.')
			return false
		}
		return true
	}

	reset(){
		this.nameField.value = '';
		this.priceField.value = '';
	}
}

class Element {
	static create(tag){
		return document.createElement(tag)
	}
}

class CartTotalElement {
	constructor(elementId, total = 0){
		this.cartTotal = total;
		this.cartTotalElement = document.getElementById(elementId);
	}

	render(){
		this.cartTotalElement.textContent = `Cart Total: $${this.cartTotal}`
	}

	updateTotal(newTotal){
		this.cartTotal = newTotal
		this.renderTotal();
	}
}

class DOMController {
	constructor(cartTotal, itemsNeededTable, itemsInCartTable, newItemForm){
		this.cartTotal = cartTotal;
		this.itemsNeededTable = itemsNeededTable;
		this.itemsInCartTable = itemsInCartTable;
		this.newItemForm = newItemForm;
	}

	renderAll(){
		this.cartTotal.render();
		this.itemsNeededTable.render();
		this.itemsInCartTable.render();
		this.newItemForm.render();
	}

	renderListTables(){
		this.itemsInCartTable.render();
		this.itemsNeededTable.render();
	}
}