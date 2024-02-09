// import $ from 'jquery';
import ItemDiv from './ItemDiv'

class NewItemForm {
	constructor($parentElement, list, domManager){
		this.$parentElement = $parentElement;
		this.list = list;
		this.domManager = domManager;
		this.cursorPosition = 0;
		this.price;
	}

	static create(parentElement, list, domManager){
		const newForm = new NewItemForm(parentElement, list, domManager);
		newForm.$form = newForm._generateFormMarkup();
		newForm.$nameInput = newForm.$form.find('.item-name');
		newForm.$priceInput = newForm.$form.find('.item-price');
		newForm.$addButton = newForm.$form.find('.add-button');
		newForm._updateCursorPostion()
		newForm._addClickEventListener();
		newForm._priceInputEventListener();
		newForm._preventMouseInputField()
		return newForm
	}

	render(){
		this.$parentElement.append(this.$form)
	}

	_generateFormMarkup(){
		return $(`
			<form class="form">
				<div class="row mt-1">
					<div class='col-8'>
						<input class="form-control form-control item-name" " type="text" placeholder="New Item">
					</div>
					<div class="col-3">
						<input id="price-input" class="form-control form-control item-price" type="text" inputmode='decimal' placeholder="Price" value=$0.00>
					</div>
					<div class="col-1 d-flex align-items-center justify-content-center">
						<i class="bi bi-plus-circle h5 m-0 text-center add-button"></i>
					</div>
				</div>
			</form>
		`)
	}

	_validate(){
		const name = this.$nameInput.val();
		if(!name || name.length === 0){
			alert('Item must have a name!')
			return false
		}
		return true;
	}

	_addClickEventListener(){
		this.$addButton.click(e=>{
			e.preventDefault();
			if(this._validate()){
				const name = this.$nameInput.val()
				const newItem = this.list.addItem(name, this.price, this.list);
				ItemDiv.create(newItem, this.domManager);
				this.domManager.cartStateChange()
				this.$priceInput.val('$0.00');
				this.$nameInput.val('');
				this.$nameInput.focus();
			}
		})
	}

	_priceInputEventListener(){
		this.$priceInput.keydown(e => {
			e.preventDefault()
			const key = e.key

			if(/[0-9]/.test(key) || key === 'Backspace' || key === 'Delete' || key === "Clear"){
				this.$priceInput.val(this._formatPriceInput(this.$priceInput, key))
				this._updateCursorPostion()
			}
		})
	}

	_preventMouseInputField(){
		this.$priceInput.on("mousemove", (e) => {
			this.$priceInput.prop("selectionStart", this.cursorPosition);
			this.$priceInput.prop("selectionEnd", this.cursorPosition);
		})
	}

	_formatPriceInput($input, key){
		let currentVal = $input.val()

		if(key === 'Backspace'){
			currentVal = currentVal.slice(0, -1)
			key = ''
		}

		currentVal = currentVal.replace(/[^0-9]/g, '').replace(/^0+/, '') + key;

		if(currentVal.length === 0) currentVal = '00'
		if(currentVal.length === 1) currentVal = '00' + currentVal;
		if(currentVal.length === 2) currentVal = '0' + currentVal

		currentVal =  currentVal.slice(0, -2) + '.' + currentVal.slice(-2)

		if(currentVal[0] === '.') currentVal = '0' + currentVal

		this.price = currentVal
		return '$' + currentVal
	}

	_updateCursorPostion(){
		this.cursorPosition = this.$priceInput.val().length
	}

}

export default NewItemForm;