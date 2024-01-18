const list = ListManager.create();
const $listContainer = $('#list-container');
const $cartContainer = $('#cart-container');
const $cartTotalSpans = $('.total-price');
const $newItemFromContainer = $('#new-item-form-container')

const domManager = new DOMManager(list, $listContainer, $cartContainer, $cartTotalSpans)
const newItemForm = NewItemForm.create($newItemFromContainer, list, domManager)
domManager.newItemForm = newItemForm

domManager.initialRender()

$(document).ready(e => $('body').show())
$(window).on('beforeunload', e => list.saveToLocal())