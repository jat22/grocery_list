


class StorageManager {
	static saveToLocal (data){
		localStorage.setItem('items', JSON.stringify(data.items));
		localStorage.setItem('itemIndices', JSON.stringify(data.itemIndices));
		localStorage.setItem('nextId', data.nextId.toString())
		localStorage.setItem('cartTotal', data.cartTotal.toString())
	}

	static loadFromLocal(){
		return (
			{
				items : JSON.parse(localStorage.getItem('items')),
				itemIndices : JSON.parse(localStorage.getItem('itemIndices')),
				nextId : +JSON.parse(localStorage.getItem('nextId')),
				cartTotal : +JSON.parse(localStorage.getItem('cartTotal'))
			}
		)
	}
}