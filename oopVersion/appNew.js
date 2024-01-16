
const list = ListManager.createFromLocalStorage();
const newItemForm = new NewItemFormElement('new-item-form', list);
const cartTotal = new CartTotalElement("cart-total", list.cartTotal);
const itemsNeededTable = new ListTableElement(list, 'items-needed', false);
const itemsInCartTable = new ListTableElement(list, 'items-in-cart', true)
const deleteListButton = new DeleteListButton('delete-list-button-container', list)
const domControl = new DOMControl(cartTotal, itemsNeededTable, itemsInCartTable, newItemForm, deleteListButton)
newItemForm.domControl = domControl
deleteListButton.domControl = domControl

window.onload = () => {
	domControl.renderAll();
}

window.addEventListener('beforeunload', e => {
	list.saveToLocal();
})