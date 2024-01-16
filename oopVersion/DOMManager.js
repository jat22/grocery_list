
class DOMList {
	constructor(items){
		this.items = items
	}


}

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