/**
 * @author Alison Benjamin
 http://benj.info @hey_benjamin
 */


jQuery(document).ready(function(){
	init();
});

// create the controls for the awards panel viewer 
var prev = document.createElement("a");
prev.classList.add('awards-control','carousel-control', 'left', 'cfront', 'cfrontleft');
prev.innerHTML = "‹";
prev.href = "#prev";

var next = document.createElement("a");
next.classList.add('awards-control','carousel-control','right','cfront');
next.innerHTML = "›";
next.href = "#next";


var public_spreadsheet_url = 'URL_GOES_HERE'

function init() {
	Tabletop.init({ 
		key: public_spreadsheet_url,
		callback: drawPanels,
		simpleSheet: true 
	})
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
		var anchor = document.createElement('a');
		anchor.href = '#' + deduped[i];
		anchor.text = deduped[i];
		anchor.innerHTML = deduped[i];
		item.appendChild(anchor);
		frag.appendChild(item);
	}
	
	var select = document.querySelector('.awards-dropdown-menu');
	select.appendChild(frag);
};


function drawPanels(data, tabletop) {
	
	//populate the past awards winner viewer with the years 
	populateYears(data);

	var main = document.getElementById("pastWinnerViewer");
	
	for(var i = 0; i < data.length; i++){
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
			panelDetail.appendChild(thumbnail);	
		}
		
		awardsPanel.appendChild(panelDetail);
		
		main.appendChild(awardsPanel);
		
	}
	
	//append slide controls 
	main.appendChild(prev);
	main.appendChild(next);
	
}



var awardViewer = function(){
	/* function to build the slide viewer*/
};





