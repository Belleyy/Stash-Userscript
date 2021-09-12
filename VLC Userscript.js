// ==UserScript==
// @name        Stash addons
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
                        RequestData().then(response_json => {
                            var findScene = response_json.data.findScene;
                            document.location.href = 'vlcs' + findScene.path;
                        });
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
    function RequestData(id) {
        id = (typeof id !== 'undefined') ? id : window.location.pathname.split("/").pop();
        // remove possible parameter
        id = id.replace(/\?.+/gm, "")
        return fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                operationName: 'FindScene',
                variables: {
                    'id': id
                },
                query: "query FindScene($id: ID!, $checksum: String) {  findScene(id: $id, checksum: $checksum) {    ...SceneData    __typename  }  sceneMarkerTags(scene_id: $id) {    tag {      id      name      __typename    }    scene_markers {      ...SceneMarkerData      __typename    }    __typename  }}fragment SceneData on Scene {  id  checksum  oshash  title  details  url  date  rating  o_counter  organized  path  phash  interactive  file {    size    duration    video_codec    audio_codec    width    height    framerate    bitrate    __typename  }  paths {    screenshot    preview    stream    webp    vtt    chapters_vtt    sprite    funscript    __typename  }  scene_markers {    ...SceneMarkerData    __typename  }  galleries {    ...SlimGalleryData    __typename  }  studio {    ...SlimStudioData    __typename  }  movies {    movie {      ...MovieData      __typename    }    scene_index    __typename  }  tags {    ...SlimTagData    __typename  }  performers {    ...PerformerData    __typename  }  stash_ids {    endpoint    stash_id    __typename  }  __typename}fragment SceneMarkerData on SceneMarker {  id  title  seconds  stream  preview  scene {    id    __typename  }  primary_tag {    id    name    aliases    __typename  }  tags {    id    name    aliases    __typename  }  __typename}fragment SlimGalleryData on Gallery {  id  checksum  path  title  date  url  details  rating  organized  image_count  cover {    file {      size      width      height      __typename    }    paths {      thumbnail      __typename    }    __typename  }  studio {    id    name    image_path    __typename  }  tags {    id    name    __typename  }  performers {    id    name    gender    favorite    image_path    __typename  }  scenes {    id    title    path    __typename  }  __typename}fragment SlimStudioData on Studio {  id  name  image_path  stash_ids {    endpoint    stash_id    __typename  }  parent_studio {    id    __typename  }  details  rating  aliases  __typename}fragment MovieData on Movie {  id  checksum  name  aliases  duration  date  rating  director  studio {    ...SlimStudioData    __typename  }  synopsis  url  front_image_path  back_image_path  scene_count  __typename}fragment SlimTagData on Tag {  id  name  aliases  image_path  __typename}fragment PerformerData on Performer {  id  checksum  name  url  gender  twitter  instagram  birthdate  ethnicity  country  eye_color  height  measurements  fake_tits  career_length  tattoos  piercings  aliases  favorite  image_path  scene_count  image_count  gallery_count  tags {    ...SlimTagData    __typename  }  stash_ids {    stash_id    endpoint    __typename  }  rating  details  death_date  hair_color  weight  __typename}"
            })
        })
            .then(r => r.json());
    }
})();