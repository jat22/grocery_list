import ItemDiv from './ItemDiv'
// import $ from 'jquery';

class DOMManager{
	constructor(list, $listContainer, $cartContainer, $cartTotalSpans){
		this.list = list;
		this.$cartContainer = $cartContainer;
		this.$listContainer = $listContainer;
		this.$cartTotalSpans = $cartTotalSpans;
		this.newItemForm = null;
	}

	initialRender(){
		for(let item of this.list.items){
			ItemDiv.create(item, this)
		}
		this.cartStateChange()
		this.newItemForm.render();
	}

	elementHasChildren($element){
		if($element.children().length) return true;
		return false
	}

	cartStateChange(){
		if(this.elementHasChildren(this.$listContainer)){
			$('#empty-list-message').hide()
		} else{
			$('#empty-list-message').show()
		}

		if(this.elementHasChildren(this.$cartContainer)){
			$('#empty-cart-message').hide()
		}else{
			$('#empty-cart-message').show()
		}

		this._updateCartTotalElement();
	}

	_updateCartTotalElement(){
		this.$cartTotalSpans.text(`$${this.list.cartTotal}`)
	}

};

export default DOMManager;