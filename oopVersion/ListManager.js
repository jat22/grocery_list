// import { StorageManager } from "./StorageManager";

class Item {
	constructor(name, price, id){
		this.name = name;
		this.price = price;
		this.id = id;
		this.inCart = false;
	}

	updatePrice(newPrice){
		this.price = newPrice
	}

	setParentList(listInstance){
		this.parentList = listInstance
	}

	listMethod(method, methodProp = null){
		this.parentList[method](methodProp)
	}
}


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

	toJSON(){
		const items = this.items.map(item => {
			if(item){
				return {
					id : item.id,
					name : item.name,
					price : item.price,
					inCart : item.inCart
				}
			}else return null
			
		})

		return ({
			items : items,
			nextId : this.nextId,
			cartTotal : this.cartTotal,
			itemIndices : this.itemIndices
		})
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
		const item = new Item(name, price, this.nextId)
		item.setParentList(this);
		this.nextId++;

		this.items.push(item);
		this.itemIndices[item.id] = this.items.length - 1;
	}

	updateItemStatus(id, isInCart){
		const itemIdx = this.getItemIdx(id);
		this.items[itemIdx].inCart = isInCart
	}

	deleteItem(id){
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
		StorageManager.saveToLocal(this)
	}

	static loadFromLocal(){
		return StorageManager.loadFromLocal()
	}

	static createFromLocalStorage(){
		const data = this.loadFromLocal()
		return new ListManager(data.items, data.itemIndices, data.nextId, data.cartTotal)
	}
}

