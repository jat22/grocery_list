
import NewItemForm from '../elements/NewItemForm';
import DOMManager from '../elements/DOMManager';
import ListManager from '../data/ListManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../src/style.css';

const list = ListManager.create();
const $listContainer = $('#list-container');
const $cartContainer = $('#cart-container');
const $cartTotalSpans = $('.total-price');
const $newItemFromContainer = $('#new-item-form-container')

const domManager = new DOMManager(list, $listContainer, $cartContainer, $cartTotalSpans)
const newItemForm = NewItemForm.create($newItemFromContainer, list, domManager)
domManager.newItemForm = newItemForm

domManager.initialRender()

$.when($.ready).then(e => $('body').show())
$(window).on('beforeunload', e => list.saveToLocal())

if(navigator.userAgent.indexOf('iPhone') > -1){
	$(() => {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1');
	})
}
