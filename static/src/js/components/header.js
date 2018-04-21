function navOptionOnClick(btn_element, drop_element){
	[...document.getElementsByClassName('drop')].forEach(
		(element, index, array) => {
			element.style.display = 'none';
		}
	);
	console.log(document.querySelectorAll('.navOptionLi > button')[0])
	document.querySelectorAll('.navOptionLi > button').forEach(
		(element, index, array) => {
			element.style.borderBottom = '.5rem solid rgba(0, 195, 208, 0)';
		}		
	);
	
	btn_element.style.borderBottom = '.5rem solid rgba(0, 195, 208, 1)';
	/*
	[...document.getElementsByClassName('btn_selected')].forEach(
		(element, index, array) => {
			element.className = ' ';
		}
	);
	btn_element.className = 'btn_selected';
	*/
	drop_element.style.display = 'block';
}


