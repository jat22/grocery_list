const newItemTextField = document.getElementById('new-item-text-field');
const newItemPriceField = document.getElementById('new-item-price-field');
const listBody = document.getElementById('list-body');
const addItemButton = document.getElementById('add-item-button');
const total = document.getElementById('cart-total');
const clearListButton = document.getElementById('clear-list-button');
const inCartList = document.getElementById('in-cart-items');

const list = JSON.parse(localStorage.getItem('list')) || [];
const idxMap = JSON.parse(localStorage.getItem('idxMap')) || {};
let idCount = +JSON.parse(localStorage.getItem('idCount')) || 1;
let cartTotal = +JSON.parse(localStorage.getItem('cartTotal')) || 0;

window.onload = () => {
	total.textContent = currentTotalDisplay();
	updateDisplayList()
}

window.addEventListener('beforeunload', e => {
	updateLocalStorage()
})

// handle click of the Add Item Button
addItemButton.addEventListener('click', e => {
	e.preventDefault();
	const itemName = newItemTextField.value;
	const itemPrice = newItemPriceField.value

	if(validateForm(itemName, itemPrice)){
		handleAddNewItem(itemName, itemPrice)
	};
});

// handle when item is checked off list
listBody.addEventListener('change', e => {
	handleItemMove(e)
})

// handle when item is unchecked
inCartList.addEventListener('change', e => {
	handleItemMove(e)
})


// handle click of remove item button in needed list
listBody.addEventListener('click', e=> {
	const target = e.target
	if(target.classList.contains('remove-button')){
		e.preventDefault();
		handleRemoveItem(target)
	}
})

// handle click of remove item button in cart list
inCartList.addEventListener('click', e=> {
	const target = e.target
	if(target.classList.contains('remove-button')){
		e.preventDefault();
		const userConfirm = confirm('This item is already in your cart, are you sure you want to delete it?')
		if(userConfirm){
			handleRemoveItem(target)
		}
	}
})

// handle click of clear list button
clearListButton.addEventListener('click', e=>{
	e.preventDefault();
	const userConfirm = confirm("Are you sure you want remove all items from your list?")
	if(userConfirm){
		handleClearingList()
	}
	
})

class ShoppingList {
	constructor(list, idxMap, idCount, cartTotal){
		this.list = list;
		this.idxMap = idxMap;
		this.idCount = idCount;
		this.cartTotal = cartTotal
	}

	getItemIdx(id){
		return this.idxMap[id]
	}

	addItem(name, price){
		const item = {
			name : name,
			price : price,
			id : this.idCount,
			inCart : false
		}
		this.idCount++

		this.list.push(item)
		this.idxMap[item.id]
	}

	updatePrice(id, newPrice){
		const itemIdx = this.getItemIdx(id)
		this.list[itemIdx].price = newPrice
	}

	updateItemStatus(id, isInCart){
		const itemIdx = this.getItemIdx(id);
		this.list[itemIdx].inCart = isInCart
	}
}




const updateItemPrice = (itemId, price) => {
	list[idxMap[itemId]].price = price
}

const updateItemStatus = (itemId, inCart) => {
	list[idxMap[itemId]].inCart = inCart
}

const updateCartTotal = (itemId, added) => {
	if(added){
		cartTotal = parseFloat((+list[idxMap[itemId]].price + cartTotal).toFixed(2))
	} else {
		cartTotal = parseFloat((cartTotal - +list[idxMap[itemId]].price).toFixed(2))
	}
	total.textContent = currentTotalDisplay();
}

const removeItem = (itemId) => {
	const itemIdx = idxMap[itemId]
	if(list[itemIdx].inCart){
		cartTotal -= list[itemIdx].price
	};
	list[itemIdx] = undefined;
	delete idxMap[itemId];
	updateDisplayList();
}

const currentTotalDisplay = () => {
	return `Cart Total $${cartTotal.toFixed(2)}`
}

const updateLocalStorage = () => {
	localStorage.setItem('list', JSON.stringify(list));
	localStorage.setItem('idxMap', JSON.stringify(idxMap));
	localStorage.setItem('idCount', idCount.toString())
	localStorage.setItem('cartTotal', cartTotal.toString())
}

const updateDisplayList = () => {
	clearListDisplay();
	for(let item of list){
		if(item && !item.inCart){
			const row = createNewRow(item)
			listBody.appendChild(row)
		}else if(item){
			const row = createNewRow(item)
			inCartList.appendChild(row)
		}
	}
}

const clearListDisplay = () => {
	listBody.innerHTML = '';
	inCartList.innerHTML = '';
}

const createNewRow = (item) => {
	const row = document.createElement('tr');
	const checkboxTd = document.createElement('td')
	const checkbox = document.createElement('input')
	const name = document.createElement('td');
	const priceTd = document.createElement('td')
	const price = document.createElement('input');
	const removeTd = document.createElement('td');
	const remove = document.createElement('button')

	row.id = item.id;

	checkbox.type = 'checkbox';
	checkbox.checked = item.inCart

	name.textContent = item.name;
	name.className = item.inCart ? 'in-cart' : 'not-in-cart';

	price.type = 'number'
	price.value = item.price || 0.00;
	price.disabled = item.inCart;
	price.inputMode = 'numeric';
	price.min = 0;

	price.addEventListener('blur', e=>{
		const target = e.target
		const itemId = target.parentNode.parentNode.id
		updateItemPrice(itemId, target.value)
	})

	remove.textContent = 'X'
	remove.className = 'remove-button'

	checkboxTd.appendChild(checkbox)
	priceTd.appendChild(price)
	removeTd.appendChild(remove)

	row.appendChild(checkboxTd)
	row.appendChild(name)
	row.appendChild(priceTd)
	row.appendChild(removeTd)

	return row
}

const validateForm = (name, price) => {
	if(name.length === 0){
		alert('Item must have a name.')
		return false
	}
	if(price.value < 0){
		alert('Price must be zero or greater.')
		return false
	}
	return true
};

const handleAddNewItem = (name, price) => {
	addItemToMemory(name, price);
	updateDisplayList();
	clearNewItemForm();
}

const clearNewItemForm = () => {
	newItemPriceField.value = '';
	newItemTextField.value = '';
}

const handleItemMove = (e) => {
	const target = e.target;
	if(target.type === 'checkbox'){
		const itemId = target.parentNode.parentNode.id;
		updateItemStatus(itemId, target.checked)
		updateCartTotal(itemId, target.checked)
		updateDisplayList()
	}
}

const handleRemoveItem = (target) => {
	const itemId = target.parentNode.parentNode.id;
	removeItem(itemId)
	total.textContent = currentTotalDisplay();
}
// listBody.addEventListener('blur', e => {
// 	const target = e.target
// 	const itemId = target.parentNode.parentNode.id
// 	updateItemPrice(itemId, target.value)
// })

const handleClearingList = () => {
	list.length = 0;
	for(let id in idxMap){
		if(idxMap.hasOwnProperty(id)){
			delete idxMap[id]
		}
	};
	idCount = 1;
	cartTotal = 0;
	updateLocalStorage();
	updateDisplayList();
	total.textContent = currentTotalDisplay();
}

const addItemToMemory = (itemName, itemPrice) => {
	const itemId = idCount;
	idCount++;

	const newItem = {
		name : itemName,
		price : itemPrice || 0,
		id : itemId,
		inCart : false
	};

	list.push(newItem);
	idxMap[itemId] = list.length - 1;
};