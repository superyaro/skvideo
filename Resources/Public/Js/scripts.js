document.addEventListener("DOMContentLoaded", function(event) { 
	var lastContainer = null;
	var lastVideoMarkup = null;
	var rememberCookieName = "skvideoremember" ;
	//console.log('initting videos');
	var videoElements = document.getElementsByClassName("sk-video-playbutton");
	for (var i = 0; i < videoElements.length; i++) {
	    videoElements[i].addEventListener('click', confirmVideo, false);
	}
	function confirmVideo() {
		lastVideoMarkup = this.getAttribute("data-videomarkup");
		lastVideoType = this.getAttribute("data-type");
		cookieName = rememberCookieName + "_" + lastVideoType;
	    //var videoMarkup = this.getAttribute("data-videomarkup");
		//console.log(this);
		//console.log(lastVideoMarkup);
	    lastContainer = findAncestor(this, 'sk-video-container');
	    if (getCookie(cookieName) == 1) {
	    	//console.log("remember we was checked, sto show the video");
	    	lastContainer.innerHTML = lastVideoMarkup;
			addClass(lastContainer, "sk-running");
	    	return;
	    }
	    console.log(lastVideoMarkup);
	    var modalElement = document.querySelector(".sk-video-modal");
	    if (modalElement == null) {
	    	var rememberme = this.getAttribute("data-rememberme");
	    	var message = this.getAttribute("data-message");
	    	var cancel = this.getAttribute("data-cancel");
	    	var continuemsg = this.getAttribute("data-continue");
			var html = '<div class="sk-video-modal"><div class="acceptgdpr-text"><span class="disclaimer">'+message+'</span><label><input type="checkbox"> '+rememberme+'</label><br>' +
				'<button class="continue btn so_button so_button_white">'+continuemsg+'</button><button class="cancel btn so_button so_button_white">'+cancel+'</button></div></div>';
			appendHtml(document.body, html); 
			document.querySelector(".sk-video-modal .cancel").addEventListener("click", function(){
			  var modalElement = document.querySelector(".sk-video-modal");
			  removeClass(modalElement, "active");
			});
			document.querySelector(".sk-video-modal .continue").addEventListener("click", function(){
			  var modalElement = document.querySelector(".sk-video-modal");
			  removeClass(modalElement, "active");
			  //console.log("Continuing");
			  handleRember(cookieName);
			  lastContainer.innerHTML = lastVideoMarkup;
			  addClass(lastContainer, "sk-running");
			});
		}
		modalElement = document.querySelector(".sk-video-modal");
		document.querySelector(".sk-video-modal input[type='checkbox']").checked=false;
		addClass(modalElement, "active");
	};

	function handleRember(theCookieName) {
		var rememberChecked = document.querySelector(".sk-video-modal input[type='checkbox']").checked;
		if (rememberChecked) {
			setCookie(theCookieName, 1, 30);
		}
	}
	function setCookie(name,value,days) {
	    var expires = "";
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days*24*60*60*1000));
	        expires = "; expires=" + date.toUTCString();
	    }
	    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}
	function getCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}
	function findAncestor (el, cls) {
		var count = 0;
	    while ((el = el.parentElement) && !el.classList.contains(cls)) {
	    	count++;
	    	if (count > 1000 || typeof el == 'undefined') {
	    		return null;
	    	}
	    };
	    return el;
	}

	function appendHtml(el, str) {
	  var div = document.createElement('div');
	  div.innerHTML = str;
	  while (div.children.length > 0) {
	    el.appendChild(div.children[0]);
	  }
	}

	function hasClass(ele,cls) {
	  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function addClass(ele,cls) {
	  if (!hasClass(ele,cls)) ele.className += " "+cls;
	}

	function removeClass(ele,cls) {
	  if (hasClass(ele,cls)) {
	    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	    ele.className=ele.className.replace(reg,' ');
	  }
	}

	// Remote Playbuttons on the screen
	$('.sk-video-remotebutton').on("click", function () {
		var self=this;
		console.log(this);
		$(this).parents(".sk-video-container").find(".sk-video-playbutton").click()
	});

});


