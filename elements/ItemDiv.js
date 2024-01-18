// import $ from 'jquery';

class ItemDiv{
	constructor(item, domManager){
		this.item = item;
		this.id = item.id;
		this.name = item.name;
		this.price = item?.price || 0;
		this.inCart = item.inCart;
		this.domManager = domManager;
		this.$element = null;
	}

	static create(item, domManager){
		const newDiv = new ItemDiv(item, domManager)
		newDiv._updateDOM();
	}

	_updateDOM(){
		this.$element?.remove();
		this._setParentNode();
		this._updateElement();
		this._addEventListeners();
		this._render();
	}

	_setParentNode(){
		if(this.inCart) this.$parentNode = $('#cart-container');
		if(!this.inCart) this.$parentNode = $('#list-container')
	}

	_updateElement(){
		if(this.inCart) this.$element = this._generateInCartMarkup()
		if(!this.inCart) this.$element = this._generateInListMarkup()
	}

	_render(){
		this.$parentNode.append(this.$element)
	}

	_addEventListeners(){
		this._addToCartEventListener();
		this._removeFromCartEventListener();
		this._deleteItemEventListener();
		this._changePriceEventListener()
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
					<input type='number' class="form-control form-control-sm" value="${this.price}" placeholder="Price">
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
				<div class="col-1 pt-1">
					<i class="bi bi-cart-dash h5 remove-from-cart-button"></i>
				</div>
				<div class="col-7 pt-1">
					<p>${this.name}</p>
				</div>
				<div class="col-3">
					<input class="form-control form-control-sm" type="number" value=${this.price} disabled>
				</div>
				<div class="col-1 pt-1">
					<i class="bi bi-trash h6 delete-item-button"></i>
				</div>
			</div>
		`)
	}

	_changePriceEventListener(){
		const $priceInput = this.$element.find('input');
		$priceInput.blur(e => {
			this.item.updatePrice($priceInput.val())
			this.price = this.item.price
		})
	}

	_addToCartEventListener(){
		this.$element.find('.add-to-cart-button').click(e => {
			this.item.addToCart();
			this.inCart = this.item.inCart;
			this._updateDOM();
			this.domManager.cartStateChange();
		})

	}

	_removeFromCartEventListener(){
		this.$element.find('.remove-from-cart-button').click(e => {
			this.item.removeFromCart();
			this.inCart = this.item.inCart;
			this._updateDOM();
			this.domManager.cartStateChange();
		})

	}

	_deleteItemEventListener(){
		this.$element.find('.delete-item-button').click(e => {
			if(this.inCart){
				if(!confirm('Item will be removed from your cart and deleted from your list. Continue?')){
					return
				}
			}
			this.item.delete();
			this.$element.remove();
			this.domManager.cartStateChange();
		})
	}
};



export default ItemDiv;