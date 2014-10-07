/**
 * @author Alison Benjamin
*/

jQuery(document).ready(function(){
	init();
});

alert("awards");

// create the controls for the awards panel viewer 
var prev = document.createElement("a");
prev.classList.add('awards-control','carousel-control', 'left', 'cfront', 'cfrontleft');
prev.innerHTML = "‹";
prev.href = "#prev";
prev.addEventListener('click', triggerLeft);

var next = document.createElement("a");
next.classList.add('awards-control','carousel-control','right','cfront');
next.innerHTML = "›";
next.href = "#next";
next.addEventListener('click', triggerRight);


var public_spreadsheet_url = 'YOUR_SPREADSHEET_URL_GOES_HERE';

function init() {
	Tabletop.init({ 
		key: public_spreadsheet_url,
		callback: drawPanels,
		simpleSheet: true 
	})
	closeAwardViewer();
}

function triggerLeft(){
	var matches = document.querySelectorAll(".awards-panel");
			for (var x = 0; x < matches.length; x++){
			var currentPanelInLightBox;
			var prevPanelInLightbox;
			
			
			/* 
			 * get the current panel on display, 
			 * change current panel to prev panel
			 */
			if( x !== 0) {
					if(	matches[x].style.display == "block"){
						currentPanelInLightBox = matches[x];
						currentPanelInLightBox.style.display = "none";
						x--;
						prevPanelInLightbox = matches[x];
						prevPanelInLightbox.style.display = "block";
						
					}
			}
		
		}
}

function triggerRight(){
	var matches = document.querySelectorAll(".awards-panel");
		for (var x = 0; x < matches.length; x++){
			var currentPanelInLightBox;
			var nextPanelInLightbox;
			
			/* 
			 * get the current panel on display, 
			 * change current panel to next panel
			 */
			
				if (x != matches.length - 1){
					if ( matches[x].style.display == "block"){
					
						currentPanelInLightBox = matches[x];
						currentPanelInLightBox.style.display = "none";
						x++;
						nextPanelInLightbox = matches[x];
						nextPanelInLightbox.style.display = "block";
						
					}
				}			
					
		}
}

//open the past-winners slideshow 
function openAwardViewer(){
	var main = document.getElementById("pastWinnerViewer");	
	main.style.display = "block";
}

//close the past-winners slideshow 
function closeAwardViewer(){
	var main = document.getElementById("pastWinnerViewer");	
	main.style.display = "none";
}



var populateYears = function(data){
	// map all the years into an dataay
	var years = data.map(function (el) {
		return el.year.toString();
	});
	
	// remove all of the duplicates from the dataay
	var deduped = years.filter(function(elem, pos) {
		return years.indexOf(elem) == pos;
	});
	
	// sort the dataay
	deduped = deduped.sort();
	
	// create a docfrag, append some new options to it
	// and append it to the select element
	var frag = document.createDocumentFragment();
	
	for (var i = 0, l = deduped.length; i < l; i++) {
		var item = document.createElement('li');
		var itemID = "year-" + deduped[i];
		item.id = itemID;
		item.classList.add("year-li");
		var anchor = document.createElement('a');
		anchor.href = '#' + deduped[i];
		anchor.text = deduped[i];
		anchor.innerHTML = deduped[i];
		item.appendChild(anchor);
		frag.appendChild(item);
	}
	
	var select = document.querySelector('.awards-dropdown-menu');
	select.appendChild(frag);
	
	skipToYear();
};


function drawPanels(data, tabletop) {
	
	//populate the past awards winner viewer with the years 
	populateYears(data);

	var main = document.getElementById("pastWinnerViewer");
	
	for(var i = 0; i < data.length; i++){
		
		/* populating the panels with data */ 
		
		var awardsPanel = document.createElement("div");
		awardsPanel.classList.add("awards-panel");
		
		var yearClass = "year-" + data[i]["year"];
		awardsPanel.classList.add(yearClass);
		
		if(data[i].largeimage){
			var largeImage = document.createElement("div");
			largeImage.classList.add("awards-large-image");
			var largeImageIMG = document.createElement("img");
			largeImageIMG.setAttribute("src",data[i].largeimage);
			largeImageIMG.setAttribute("alt",data[i].llargeimagealttext);
			largeImage.appendChild(largeImageIMG);
			awardsPanel.appendChild(largeImage);
			awardsPanel.classList.add("has-large-image");
		}
		
		else{
			awardsPanel.classList.add("has-no-large-image");
		}
		
		
		var panelDetail = document.createElement("div");
		panelDetail.classList.add("panel-detail");
		main.appendChild(panelDetail);
		
		
		var navHeader = document.createElement("p");
		navHeader.classList.add("nav-header");
		navHeader.innerHTML = data[i]["awardcategory"];
		panelDetail.appendChild(navHeader);
		
		var h3 = document.createElement("h3");
		h3.innerHTML = data[i]["winnername"];
		panelDetail.appendChild(h3);
		
		var pAboutAwardWinner = document.createElement("p");
		pAboutAwardWinner.innerHTML = data[i]["aboutwinner"];
		panelDetail.appendChild(pAboutAwardWinner);
		
		if(data[i]["winnerthumbnail"]){
			var thumbnail = document.createElement("img");
			thumbnail.setAttribute("src",data[i]["winnerthumbnail"]);
			thumbnail.setAttribute("alt",data[i]["winnername"]);
			panelDetail.appendChild(thumbnail);	
		}
		
		awardsPanel.appendChild(panelDetail);
		
		main.appendChild(awardsPanel);
		
		/* setting the panels' display to none */ 
		awardsPanel.style.display = "none";
	
	}
	
	/* 
	 * loop through panels,
	 * and display the first panel of 
	 * the most recent year 
	 */
	
	var matches = document.querySelectorAll(".awards-panel");
	for (var j = 0; j < matches.length; j++){
		if (j === 0){
			matches[0].style.display = "block";
		}
	}
		
	/* when a year's panels have changed, update the navigation ul */
		
	
	//append slide controls 
	main.appendChild(prev);
	main.appendChild(next);
	openAwardViewer();
	
}

/* if a year is chosen from the drop down, display the first 
 * panel from that year 
 */
var skipToYear = function (){
	
	/*add event listner to each year in the dropdown
	 * ul classed .dropdown-menu .awards-dropdown-menu
	 */ 
	
	var list = document.querySelectorAll('.year-li a');
	for (var i = 0; i < list.length; i++){
		list[i].addEventListener('click', skipPanelToYear);	
	}
	
};

var skipPanelToYear = function(){
	
	/* get the year being viewed, based on the 
	 * li a element clicked within the ul 
	 * classed .dropdown-menu .awards-dropdown-menu
	 */
	
	var year = this.innerHTML;
	var yearClass = "year-" + year;
	
	var panelYear = document.querySelector('.' + yearClass);
	
	//get the current year being viewed 
	var matches = document.querySelectorAll(".awards-panel");
	var currentPanelInLightBox;
	
	for (var i = 0; i < matches.length; i++){
		if(	matches[i].style.display == "block"){
			currentPanelInLightBox = matches[i];
			
			// if it's not already being viewed, skip to the year requested
			if (panelYear.style.display == "none"){
					matches[i].style.display = "none";
					panelYear.style.display = "block";
					
			}		
		}
	}
};






