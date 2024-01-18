import StorageManager from './StorageManager';
import Item from './Item'


class ListManager {
	constructor(items=[], cartTotal=0){
		this.items = items;
		this.cartTotal = cartTotal;
	}

	static create(){
		const items = StorageManager.loadFromLocal() || []

		const shoppingList = new ListManager()
		items.forEach(i => {
			shoppingList.addItem(i.name, i.price, shoppingList, i.inCart)

		})

		return shoppingList;
	}

	addItem(name, price, list, inCart=false){
		const id = this.items.length;
		const item = new Item(name, price, id, list, inCart);

		if(item.inCart){
			this.cartTotal += +item.price
		}

		this.items.push(item);
		return item
	}

	deleteAllItems(){
		this.cartTotal = 0;
		this.items.length = 0;
		this.saveToLocal()
	}

	saveToLocal(){
		StorageManager.saveToLocal(this._storageData())
	}

	_storageData(){
		return this.items.filter(i => !!i).map(i => {
				return {
					name : i.name,
					price : i.price,
					inCart : i.inCart
				}
		})
	}
};

export default ListManager;