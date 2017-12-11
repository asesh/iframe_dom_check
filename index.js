// index.js: 
// Copyright (C) 2017 CloudFactory. All rights reserved

// References:
// 1: Detect if browser supports playing HTML5 mp3: https://stackoverflow.com/questions/8469145/how-to-detect-html5-audio-mp3-support
// 2: Detect Google Chrome translation: https://stackoverflow.com/questions/4887156/detecting-google-chrome-translation
//

// Global variables
var g_success_label = "Success";
var g_failed_label = "Failed";

// Checks if mp3 is supported by the browser or not
function is_mp3_supported()
{
  // Reference 1
  var audio_element = document.createElement('audio');
  return !!(audio_element.canPlayType && audio_element.canPlayType('audio/mpeg;').replace(/no/, ''));
}

function set_iframe_issue_status(status) {
  document.getElementById("issue_table").rows[1].cells.item(1).textContent = status;
}

// Checks if iframe issue is present or not
function is_iframe_issue_present()
{
  let iframeMsgCount = 0;
  let iFrame = document.createElement("iframe");
  iFrame.src = "iframe/frame.html";
  iFrame.id = "secondIframe";
  setTimeout(() =>
  {
    document.getElementById("container").appendChild(iFrame);
    setTimeout(() =>
    {
      const iFrame1 = document.getElementById('firstIframe');
      const iFrame2 = document.getElementById('secondIframe');
      iFrame1.contentWindow.postMessage('getColor', '*');
      iFrame2.contentWindow.postMessage('getColor', '*');
    }, 1000);
  }, 3000);
  window.addEventListener('message',(e)=>
    {
      iframeMsgCount++;
      if(!e.data)
      {
        set_iframe_issue_status(g_failed_label);
      }
      if(iframeMsgCount === 2)
      {
        set_iframe_issue_status(g_success_label);
      }
    });
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function()
{
  // Store the handle of table cells where we will post our result
  var issue_table = document.getElementById("issue_table");
  var iframe_issue_cell = issue_table.rows[1].cells.item(1);
  var mp3_issue_cell = issue_table.rows[2].cells.item(1);
  //var language_translation_issue_cell = issue_table.rows[3].cells.item(1);

  // Let's check if mp3 is supported by the browser or not
  if(is_mp3_supported()) // MP3 is supported
  {
    mp3_issue_cell.innerHTML = g_success_label;
  }
  else // MP3 is not supported
  {
    mp3_issue_cell.innerHTML = g_failed_label;
  }

  is_iframe_issue_present();

}, false);