// ==UserScript==
// @name        Stash Userscript - Performer link scene
// @description Performer button to show it in the scene tab
// @match       *localhost:9999/*
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant 		GM_openInTab
// @icon        https://stashapp.cc/images/stash.svg
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
        /*############################
        ##		Performers Page		##
        ##############################*/
        if (URL.match(/performers\/\d+/) !== null) { // Page d'une actrice
            console.debug('[Navigation] Performers Page');
            waitForElementClass("name-icons", function () { //#CSS
                if (!document.getElementById("div_Stash")) {
                    // Button to go on Scene Wall with filter performer
                    var div_Stash = document.createElement("button");
                    div_Stash.className = "minimal btn btn-primary"; //#CSS
                    div_Stash.type = "button";
                    div_Stash.id = "div_Stash";
                    div_Stash.title = "Voir dans Scenes";
                    div_Stash.innerHTML = '<svg class="svg-inline--fa fa-w-16 fa-icon undefined" xmlns="http://www.w3.org/2000/svg" style="" viewBox="0 0 100 100"><path fill="#FFF" stroke="#06D" stroke-width="10" d="m43,35H5v60h60V57M45,5v10l10,10-30,30 20,20 30-30 10,10h10V5z"/></svg>';
                    //console.debug("Creating button for performers...");
                    var div_Main = document.getElementsByClassName("name-icons")[0]; //#CSS
                    div_Main.appendChild(div_Stash);
                    document.getElementById("div_Stash").addEventListener("click", function () { stash_Button("LinkScene"); }, false);
                }
            });
        } else {
            if (document.getElementById("div_Stash")) {
                //console.debug("Removed performer button");
                document.getElementById("div_Stash").remove();
            }
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

    function stash_Button(option) {
        if (option === 'LinkScene') {
            let idPerf = window.location.pathname.split("/")[2];
            let namePerf = document.getElementsByTagName("h2")[0].textContent; //#CSS
            window.location.href = "http://localhost:9999/scenes?c={%22type%22:%22performers%22,%22value%22:[{%22id%22:%22" + idPerf + "%22,%22label%22:%22" + namePerf + "%22}],%22modifier%22:%22INCLUDES_ALL%22}&disp=0&p=1&perPage=40&sortby=date&sortdir=asc";
            return;
        }
    }
})();
