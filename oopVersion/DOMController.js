class DOMControl{
	constructor(cartTotal, itemsNeededTable, itemsInCartTable, newItemForm, deleteListButton){
		this.cartTotal = cartTotal;
		this.itemsNeededTable = itemsNeededTable;
		this.itemsInCartTable = itemsInCartTable;
		this.newItemForm = newItemForm;
		this.deleteListButton = deleteListButton;
	}

	renderAll(){
		this.cartTotal.render();
		this.itemsNeededTable.render();
		this.itemsInCartTable.render();
		this.newItemForm.render();
		this.deleteListButton.render()
	}

	renderListTables(){
		this.itemsInCartTable.render();
		this.itemsNeededTable.render();
	}
}