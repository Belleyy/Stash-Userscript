// ==UserScript==
// @name        Stash Userscript
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
})();
