
const listBody = document.getElementById('list-body');
const addItemButton = document.getElementById('add-item-button');
const cartTotal = document.getElementById('cart-total');
const clearListButton = document.getElementById('clear-list-button');
const inCartList = document.getElementById('in-cart-items');

const list = ListManager.createFromLocalStorage()
const newItemForm = new ItemForm('new-item-text-field', 'new-item-price-field');

window.onload = () => {
	cartTotal.textContent = list.formattedCartTotal
	updateDisplayList()
}

window.addEventListener('beforeunload', e => {
	list.saveToLocal();
})

// handle click of the Add Item Button
addItemButton.addEventListener('click', e => {
	e.preventDefault();
	if(newItemForm.validate()){
		const name = newItemForm.nameValue
		const price = newItemForm.priceValue
		handleAddNewItem(name, price)
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

const removeItem = (itemId) => {
	const itemIdx = idxMap[itemId]
	if(list[itemIdx].inCart){
		cartTotal -= list[itemIdx].price
	};
	list[itemIdx] = undefined;
	delete idxMap[itemId];
	updateDisplayList();
}

const updateDisplayList = () => {
	clearListDisplay();
	for(let item of list.items){
		if(item && !item.inCart){
			const row = createNewRow(item)
			listBody.appendChild(row)
		}else if(item){
			const row = createNewRow(item)
			inCartList.appendChild(row)
		}
	}
	cartTotal.textContent = list.formattedCartTotal

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
		list.updatePrice(itemId, target.value)
	})

	remove.textContent = 'X'
	remove.className = 'remove-button'

	// checkboxTd.appendChild(checkbox)
	priceTd.appendChild(price)
	removeTd.appendChild(remove)

	row.appendChild(checkboxTd)
	row.appendChild(name)
	row.appendChild(priceTd)
	row.appendChild(removeTd)

	return row
}

const handleAddNewItem = (name, price) => {
	list.addItem(name, price)
	updateDisplayList();
	newItemForm.reset();
}

const handleItemMove = (e) => {
	const target = e.target;
	if(target.type === 'checkbox'){
		const itemId = target.parentNode.parentNode.id;
		if(target.checked) list.addItemToCart(itemId);
		if(!target.checked) list.removeItemFromCart(itemId)
		updateDisplayList()
	}
}

const handleRemoveItem = (target) => {
	const itemId = target.parentNode.parentNode.id;
	list.removeItem(itemId)
	updateDisplayList()
}

const handleClearingList = () => {
	list.deleteAllItems();
	updateDisplayList();
}
