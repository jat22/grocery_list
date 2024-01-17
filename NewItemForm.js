class NewItemForm {
	constructor($parentElement, list, cartTotal){
		this.$parentElement = $parentElement;
		this.list = list;
		this.cartTotal = cartTotal;
	}

	static create(parentElement, list, cartTotal){
		const newForm = new NewItemForm(parentElement, list, cartTotal);
		newForm.$form = newForm._generateFormMarkup();
		newForm.$nameInput = newForm.$form.find('.item-name');
		newForm.$priceInput = newForm.$form.find('.item-price');
		newForm.$addButton = newForm.$form.find('button');
		newForm._addClickEventListener();
		return newForm
	}

	render(){
		this.$parentElement.append(this.$form)
	}

	_generateFormMarkup(){
		return $(`
			<form class="form">
				<div class="row ">
					<div class="col-1">
					</div>
					<div class='col-7'>
						<input class="form-control form-control-sm item-name" " type="text" placeholder="Item">
					</div>
					<div class="col-3">
						<input class="form-control form-control-sm item-price" type="text" placeholder="Price">
					</div>
					<div class="col-1 text-center">
						<button class="btn btn-sm p-0 m-0">
							<i class="bi bi-plus-circle h6"></i>
						</button>
					</div>
				</div>
			</form>
		`)
	}

	_validate(){

		const name = this.$nameInput.val();
		const price = +this.$priceInput.val();
		if(!name || name.length === 0){
			alert('Item must have a name!')
			return false
		}
		if(!price || isNaN(price) || price < 0){
			alert('Price must be a number 0 or greater!')
			return false
		}
		this.priceVal = price;
		this.nameVal = name;
		return true;
	}

	_addClickEventListener(){
		this.$addButton.click(e=>{
			e.preventDefault();
			if(this._validate()){
				const newItem = this.list.addItem(this.nameVal, this.priceVal, this.list);
				ItemDiv.create(newItem, this.cartTotal);
				this.$priceInput.val('')
				this.$nameInput.val('')
			}
		})
	}

}