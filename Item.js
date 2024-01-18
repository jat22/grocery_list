

class Item {
	constructor(name, price, id, list,  inCart=false){
		this.name = name;
		this.price = price;
		this.id = id;
		this.inCart = inCart;
		this.list = list;
	}

	updatePrice(newPrice){
		console.log(newPrice)
		this.price = newPrice
	}

	addToCart(){
		this.inCart = true;
		const newTotal = (parseFloat(this.list.cartTotal) + parseFloat(this.price)).toFixed(2);
		this.list.cartTotal = parseFloat(newTotal)
	}

	removeFromCart(){
		this.inCart = false;
		const newTotal = (parseFloat(this.list.cartTotal) - parseFloat(this.price)).toFixed(2);
		this.list.cartTotal = parseFloat(newTotal)
	}

	delete(){
		if(this.inCart){
			this.removeFromCart();
		}
		this.list.items[this.id] = null
	}
}