
class ItemDiv{
	constructor(item, cartTotal){
		this.item = item;
		this.id = item.id;
		this.name = item.name;
		this.price = item?.price || 0;
		this.inCart = item.inCart;
		this.cartTotal = cartTotal
	}

	static create(item, cartTotal){
		const newDiv = new ItemDiv(item, cartTotal)
		newDiv._updateDOM();
	}

	_updateDOM(){
		this.$div?.remove();
		this._setParentNode();
		this._generateDivMarkUp();
		this._addEventListeners();
		this._render();
	}

	_setParentNode(){
		if(this.inCart) this.$parentNode = $('#cart-container');
		if(!this.inCart) this.$parentNode = $('#list-container')
	}

	_generateDivMarkUp(){
		if(this.inCart) this.$div = this._generateInCartMarkup()
		if(!this.inCart) this.$div = this._generateInListMarkup()
	}

	_render(){
		this.$parentNode.append(this.$div)
	}

	_addEventListeners(){
		this._addToCartEventListener();
		this._removeFromCartEventListener();
		this._deleteItemEventListener();
	}

	_generateInListMarkup(){
		return $(`
			<div class="row" id=${this.id}>
				<div class="col-1 pt-1">
					<i class="bi bi-cart-plus h5 add-to-cart-button"></i>
				</div>
				<div class="col-7 pt-1">
					<p>${this.name}</p>
				</div>
				<div class="col-3">
					<input class="form-control form-control-sm" type="text" value="${this.price}" placeholder="Price">
				</div>
				<div class="col-1 pt-1">
					<i class="bi bi-trash h6 delete-item-button"></i>
				</div>
			</div>
		`)
	}

	_generateInCartMarkup(){
		return $(`
			<div class="row" id=${this.id}>
				<div class="col-2">
					<button class="btn btn-sm remove-from-cart-button">
						<i class="bi bi-cart-dash h5"></i>
					</button>
				</div>
				<div class="col-5 pt-1">
					<p>${this.name}</p>
				</div>
				<div class="col-3">
					<input class="form-control form-control-sm" type="text" value=${this.price} disabled>
				</div>
				<div class="col-2 text-center">
					<button class="btn btn-sm delete-item-button">
						<i class="bi bi-trash h6"></i>
					</button>
				</div>
			</div>
		`)
	}

	_addToCartEventListener(){
		this.$div.find('.add-to-cart-button').click(e => {
			e.preventDefault();
			this.item.addToCart();
			this.inCart = this.item.inCart;
			this._updateDOM();
			this.cartTotal.updateDOM()
		})

	}

	_removeFromCartEventListener(){
		this.$div.find('.remove-from-cart-button').click(e => {
			e.preventDefault();
			this.item.removeFromCart();
			this.inCart = this.item.inCart;
			this._updateDOM();
			this.cartTotal.updateDOM()
		})

	}

	_deleteItemEventListener(){
		this.$div.find('.delete-item-button').click(e => {
			e.preventDefault();
			if(this.inCart){
				if(!confirm('Item will be removed from your cart and deleted from your list. Continue?')){
					return
				}
			}
			this.item.delete();
			this.cartTotal.updateDOM()
			this.$div.remove();
		})
	}
}



