// index.js: 
// Copyright (C) 2017 CloudFactory. All rights reserved

// References:
// 1: Detect if browser supports playing HTML5 mp3: https://stackoverflow.com/questions/8469145/how-to-detect-html5-audio-mp3-support
// 2: Detect Google Chrome translation: https://stackoverflow.com/questions/4887156/detecting-google-chrome-translation
//

// Checks if mp3 is supported by the browser or not
function is_mp3_supported()
{
  // Reference 1
  var audio_element = document.createElement('audio');
  return !!(audio_element.canPlayType && audio_element.canPlayType('audio/mpeg;').replace(/no/, ''));
}

// Checks if iframe issue is present or not
function is_iframe_issue_present()
{
  return true;
}

// Checks if language translation issue is present or not
function is_language_translation_issue_present()
{
  return true;
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function()
{
  // Store the handle of table cells where we will post our result
  var iframe_issue_cell = document.getElementById("issue_table").rows[0].cells;
  var mp3_issue_cell = document.getElementById("issue_table").rows[1].cells;
  var language_translation_issue_cell = document.getElementById("issue_table").rows[2].cells;

  // Let's check if mp3 is supported by the browser or not
  if(is_mp3_supported())
  {
    mp3_issue_cell.innerHTML = "Success";
  }
  else
  {
    mp3_issue_cell.innerHTML = "Failed";
  }

  // Let's check iframe issue
  if(is_iframe_issue_present())
  {
    iframe_issue_cell.innerHTML = "Success";
  }
  else
  {
    iframe_issue_cell.innerHTML = "Failed";
  }

  // Let's check language translation issue
  if(is_language_translation_issue_present())
  {
    language_translation_issue_cell.innerHTML = "Sucess";
  }
  else
  {
    language_translation_issue_cell.innerHTML = "Failed";
  }
}, false);