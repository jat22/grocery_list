
class StorageManager {
	static saveToLocal (list){
		localStorage.setItem('shoppingList', JSON.stringify(list))
	}

	static loadFromLocal(){
		return JSON.parse(localStorage.getItem('shoppingList'))
	}
}

export default StorageManager;