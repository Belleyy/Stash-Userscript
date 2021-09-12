// ==UserScript==
// @name        Stash Userscript (VLC)
// @description Userscript for Stash
// @match       *localhost:9999/*
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant 		GM_openInTab
// @version 1.0
// @author Belley
// ==/UserScript==

(function () {
    'use strict';
    //console.log('Script Stash initialize');
    var fireOnHashChangesToo = true;
    var pageURLCheckTimer = setInterval(
        function () {
            // Loop every 500ms
            if (this.lastPathStr !== location.pathname || this.lastQueryStr !== location.search || (fireOnHashChangesToo && this.lastHashStr !== location.hash)) {
                this.lastPathStr = location.pathname;
                this.lastQueryStr = location.search;
                this.lastHashStr = location.hash;
                gmMain();
            }
        }, 500
    );

    function gmMain() {
        //console.debug('========    NEW PAGE LOADED    ========');
        var URL = window.location.href;

        /*########################
        ##		Wall Scene		##
        ##########################*/
        if (URL.match(/scenes\?/) != null) { // Selection de scenes
            console.debug('[Navigation] Wall-Scene Page');
        } else {
        }
        /*########################
        ##		Scene			##
        ##########################*/
        if (URL.match(/scenes\/\d+/) != null) { // Sur la Scene (Video, Edit...)
            console.debug('[Navigation] Scene Page');
            waitForElementClass("jw-preview", function () {
                if (!document.getElementById("userscript_vlc")) {
                    var jwplayer_div = document.getElementById('main-jwplayer');
                    var vlc_div = document.createElement('div');
                    vlc_div.innerHTML = '<a class="minimal settings-button btn btn-primary" id="userscript_vlc" style="z-index: 1;position: relative;float: left;border-radius: 50px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16"><path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"></path></svg></a>';
                    jwplayer_div.insertBefore(vlc_div, document.getElementsByClassName('jw-aspect jw-reset')[0]);
                    document.getElementById("userscript_vlc").addEventListener("click", function () {
                        var path_text = getElementByXpath('//a[contains(@href,"file://")]/@href')
                        if (path_text){
                            document.location.href = 'vlcs:' + path_text.textContent.replace("file://","");
                        }else{
                            console.error("Error getting the path by using xPath")
                        }
                    }, false);

                }
            });
        } else {
        }
        /*########################
        ##		Movies Wall		##
        ##########################*/
        if (URL.match(/movies\?/) != null) { // Movies Wall
            console.debug('[Navigation] Wall-Movies Page');
        } else {
        }
        /*########################
        ##		Movies Page		##
        ##########################*/
        if (URL.match(/movies\/\d+/) != null) { // Movies Page
            console.debug('[Navigation] Movies Page');
        } else {
        }
        /*########################
        ##		Marker Wall		##
        ##########################*/
        if (URL.match(/scenes\/markers/) != null) {
            console.debug('[Navigation] Wall-Markers Page');
        } else {
        }
        /*############################
        ##		Galleries Wall		##
        ##############################*/
        if (URL.match(/galleries\?/) != null) {
            console.debug('[Navigation] Wall-Galleries Page');
        } else {
        }
        /*############################
        ##		Galleries Page		##
        ##############################*/
        if (URL.match(/galleries\/\d+/) != null) {
            console.debug('[Navigation] Galleries Page');
        } else {
        }
        /*############################
        ##		Performers Wall		##
        ##############################*/
        if (URL.match(/performers\?/) != null) {
            console.debug('[Navigation] Wall-Performers Page');
        } else {
        }
        /*############################
        ##		Performers Page		##
        ##############################*/
        if (URL.match(/performers\/\d+/) != null) {
            console.debug('[Navigation] Performers Page');
        } else {
        }
        if (URL.match(/performers\/\d+\/scenes/) != null) {
            console.debug('[Navigation] Performers Page - Scene');
        }
        /*########################
        ##		Studio Wall		##
        ##########################*/
        if (URL.match(/studios\?/) != null) {
            console.debug('[Navigation] Wall-Studios Page');
        } else {
        }
        if (URL.match(/studios\/\d+$/) != null) {
            console.debug('[Navigation] Studios Page - Scene');
        }
        /*########################
        ##		Studio Page		##
        ##########################*/
        if (URL.match(/studios\/\d+/) != null) {
            console.debug('[Navigation] Studios Page');
        } else {
        }
        /*########################
        ##		Tags Wall		##
        ##########################*/
        if (URL.match(/tags\?/) != null) {
            console.debug('[Navigation] Wall-Tags Page');
        } else {
        }
        /*########################
        ##		Tags Page		##
        ##########################*/
        if (URL.match(/tags\/\d+/) != null) {
            console.debug('[Navigation] Tags Page');
        } else {
        }
        /*############################
        ##		Settings Page		##
        ##############################*/
        if (URL.match(/settings/) != null) { // Settings Page
            console.debug('[Navigation] Settings Page');
        } else {
        }
    }
    function waitForElementClass(elementId, callBack, time) {
        time = (typeof time !== 'undefined') ? time : 100;
        window.setTimeout(function () {
            var element = document.getElementsByClassName(elementId);
            if (element.length > 0) {
                callBack(elementId, element);
            } else {
                waitForElementClass(elementId, callBack);
            }
        }, time);
    }
    function getElementByXpath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
})();
