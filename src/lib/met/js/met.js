/*
Mobile Experience Template
v0.1.0
*/

//Global Variables
var language; //Page Language
var met; //met Object
var deviceReady = false; //Phonegap ready flag
var gaPlugin; //Google Analytics Plugin

//Constants
var GA_ACCOUNT_ID = "UA-55080840-2"; //Google Analytics Account ID
var APP_ID = "com.hc-sc.mobile"; //App ID e.g. com.hc-sc.mobile
var APP_NAME = "App Name";
var APP_VERSION = "0.0.0";

//Set this to consistant page text you'd like to track e.g. document.title
//If empty string, defaults to full page location
var GA_PAGE_ID = "";



//Inital Code
document.addEventListener("deviceready", onDeviceReady, false); //Phone Gap ready listener

//Code dependant on device ready firing
function onDeviceReady() {
	deviceReady = true;
	gaPlugin = window.plugins.gaPlugin;
	gaPlugin.init(successHandler, errorHandler, GA_ACCOUNT_ID, 10);
	met.GA.trackPage(GA_PAGE_ID); //Google Analytics track page

	initialize(); //App specific initializtion routine
}

//App specific initialize routine
function initialize() {
	var date = new Date(document.lastModified);
	$(".date-modified").text(date.getFullYear() + "-" + ("0" + (parseInt(date.getMonth()) + 1)).slice(-2) + "-" + date.getDate());//Set last modified date

	met.setLanguage();
}

//App specific cleanup routine
function exit() {
	met.GA.exit(); //Exit Google Analytics

}

//Success Handler
function successHandler(s) {
	//console.log(s.toString); // Optional
}

//Error Handler
function errorHandler(e) {
	if (deviceReady) {
		alert(e.toString());
	} else {
		console.log(e.toString());
	}
}

met = {
	// Set Language
	setLanguage: function () {
		var lang = $('html').attr('lang');
		if (typeof (lang) !== 'undefined') {
			language = lang;
			met.storage.save("language", language);
		} else {
			if (met.storage.exists("language")) {
				language = met.storage.load("language");
			}
		}
	},

	//Google Analytics
	GA: {
		exit: function () {
			if (deviceReady) {

				gaPlugin.exit(successHandler, errorHandler);
			}
		},
		trackPage: function (pageId) {
			var pageName;
			if (deviceReady) {
				pageName = window.location.pathname;
				if ((typeof pageId !== "undefined")) {
					if (pageId !== "")
						pageName = pageId;
				}
				gaPlugin.trackPage(successHandler, errorHandler, pageName);
			} else {
				errorHandler("Device not ready.");
			}
		},
		trackEvent: function (category, eventAction, eventLabel, eventValue) {
			if (deviceReady) {
				gaPlugin.trackEvent(successHandler, errorHandler, category, eventAction, eventLabel, eventValue);
			} else {
				errorHandler("Device not ready.");
			}
		}
	},

	//Local Storage
	storage: {
		load: function (key) {
			return localStorage[key];
		},

		exists: function (key) {
			if (typeof localStorage[key] !== 'undefined') {
				return true;
			}
			return false;
		},

		clear: function() {
			return localStorage.clear();
		},

		size: function() {
			return localStorage.length;
		},

		save: function (key, value) {
			localStorage[key] = value;
		},

		delete: function (key) {
			localStorage.removeItem(key);
		}
	},

	//Session Storage
	session: {
		load: function (key) {
			return sessionStorage[key];
		},

		exists: function (key) {
			if (typeof sessionStorage[key] !== 'undefined') {
				return true;
			}
			return false;
		},

		clear: function() {
			return sessionStorage.clear();
		},

		size: function() {
			return sessionStorage.length;
		},

		save: function (key, value) {
			sessionStorage[key] = value;
		},

		delete: function (key) {
			sessionStorage.removeItem(key);
		}
	}

};

//Dev Testing
if (navigator.userAgent.search("MSIE") >= 0) {
	alert("You must use a modern browser for this app to work. Internet Explorer 10 or better.");
} else if (window.location.href.indexOf("http") === 0) {
	$(function () {
		initialize();
	});
}