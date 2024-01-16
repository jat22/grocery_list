
const list = ListManager.create();
const addItemForm = AddItemForm.create('new-item-form', list);
const cartTotal = CartTotalElement.create("cart-total-container", list);
const itemsNeededTable = new ListTableElement(list, 'items-needed', false);
const itemsInCartTable = new ListTableElement(list, 'items-in-cart', true);

const deleteListButton = new DeleteListButton('delete-list-button-container', list);
const domControl = new DOMControl(cartTotal, itemsNeededTable, itemsInCartTable, addItemForm, deleteListButton);

addItemForm.domControl = domControl;
deleteListButton.domControl = domControl;
itemsNeededTable.domControl = domControl;
itemsInCartTable.domControl = domControl;


window.onload = () => {
	domControl.renderAll();
}

window.addEventListener('beforeunload', e => {
	list.saveToLocal();
})