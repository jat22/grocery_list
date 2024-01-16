// import { StorageManager } from "./StorageManager";

class ListManager {
	constructor(items, itemIndices, nextId, cartTotal){
		this.items = items || [];
		this.itemIndices = itemIndices || {};
		this.nextId = nextId || 1;
		this.cartTotal = cartTotal || 0;
	}

	getItemIdx(id){
		return this.itemIndices[id]
	}

	get formattedCartTotal (){
		return `$${this.cartTotal.toFixed(2)}`
	}

	get allData (){
		return (
			{
				items : this.items,
				itemIndices : this.itemIndices,
				nextId : this.nextId,
				cartTotal : this.cartTotal
			}
		)
	}

	addItem(name, price){
		const item = {
			name : name,
			price : price,
			id : this.nextId,
			inCart : false
		}
		this.nextId++;

		this.items.push(item);
		this.itemIndices[item.id] = this.items.length - 1;
	}

	updatePrice(id, newPrice){
		const itemIdx = this.getItemIdx(id)
		this.items[itemIdx].price = newPrice
	}

	updateItemStatus(id, isInCart){
		const itemIdx = this.getItemIdx(id);
		this.items[itemIdx].inCart = isInCart
	}

	removeItem(id){
		const idx = this.getItemIdx(id);
		if(this.items[idx].inCart){
			this.removeItemFromCart(id)
		}
		this.items[idx] = null;
		delete this.itemIndices[id]
	}

	addItemToCart(id){
		const idx = this.getItemIdx(id);
		this.items[idx].inCart = true;
		this.cartTotal += +this.items[idx].price
	}

	removeItemFromCart(id){
		const idx = this.getItemIdx(id);
		this.items[idx].inCart = false;
		this.cartTotal -= this.items[idx].price
	}

	emptyCart(){
		for(let id in this.itemIndices){
			if(this.itemIndices.hasOwnProperty(id)){
				const idx = this.itemIndices[id]
				items[idx].inCart = false;
			}
		}
	}

	deleteAllItems(){
		this.nextId = 1;
		this.cartTotal = 0;
		this.items.length = 0;
		for(let id in this.itemIndices){
			if(this.itemIndices.hasOwnProperty(id)){
				delete this.itemIndices[id]
			}
		};
		this.saveToLocal()
	}

	saveToLocal(){
		StorageManager.saveToLocal(this.allData)
	}

	static loadFromLocal(){
		return StorageManager.loadFromLocal()
	}

	static createFromLocalStorage(){
		const data = this.loadFromLocal()

		return new ListManager(data.items, data.itemIndices, data.nextId, data.cartTotal)
	}
}

