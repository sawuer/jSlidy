var jSlidy = (function(){
	// Constructor object
	function Constructor(options) {
	}
	
	// Private functions -------------------------
	function _(domElement) {
    var all = document.querySelectorAll(domElement);
    return all.length > 1 ? all : document.querySelector(domElement);
	}

	function getItems(el) {
		var items = _(el).querySelectorAll('li');
		items.forEach(i => i.classList.add('jslidy-item'));
		return items;
	}

	function hideNeighboring(el) {
		getItems(el).forEach(i => {
			i.style.display = 'none';
		});
		getItems(el)[0].classList.add('active');

	}

	function addControls(el) {
		var controllsDiv = document.createElement('div');
		controllsDiv.setAttribute('class', 'jslidy-control');
		controllsDiv.innerHTML = `
			<span class="jslidy-control__left">left</span>
			<span class="jslidy-control__right">right</span>
		`;
		_(el).appendChild(controllsDiv);
	}


	// Controls mechanics
	function controlsMechanics(el) {
		var control = _(el).querySelector('.jslidy-control');
		var controls = control.querySelectorAll('span');
		var items = getItems(el);
		function next(dir) {
			var active = _(el).querySelector('.jslidy-item.active')
			function move() {
				var next = (dir == 'r') ? active.nextSibling.nextSibling : (dir == 'l') ? active.previousSibling.previousSibling : null;
				active.classList.remove('active');
				next.classList.add('active');	
			}
			if (dir == 'r') {
				if (items[items.length-1].classList['value'].split(' ').indexOf('active') === 1) {
					active.classList.remove('active');
					items[0].classList.add('active');				
				} else {
					move();
				}
			} else if (dir == 'l') {
				if (items[0].classList['value'].split(' ').indexOf('active') === 1) {
					active.classList.remove('active');
					items[items.length-1].classList.add('active');				
				} else {
					move();
				}
			}
		}
	
		function eventControl(button) {
			if (button.classList.contains('jslidy-control__right')) {
				next('r');
			} else if (button.classList.contains('jslidy-control__left')) {
				next('l');
			}
		}

		function getControl(item) {
			item.addEventListener('click', function(e) {
				return eventControl(e.target);
			});
		}

		controls.forEach(i => getControl(i));
	}


	function toThe(el) {
		hideNeighboring(el);
		addControls(el);
		controlsMechanics(el);
	}
	
	// Public -------------------------------
	Constructor.prototype = {
		toThe
	}

	return Constructor;

}());