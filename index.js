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

// Invoked when DOM subtree will be modified by Google Translate after translation
document.addEventListener('DOMSubtreeModified', function (e)
{
  if(e.target.tagName === 'HTML' && window.google)
  {
    if(e.target.className.match('translated'))
    {
        alert('This page has been translated');
    }
    else
    {
        alert('Translation cancelled');
    }
  }
}, true);

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function()
{
  // Store the handle of table cells where we will post our result
  var issue_table = document.getElementById("issue_table");
  var iframe_issue_cell = issue_table.rows[1].cells.item(1);
  var mp3_issue_cell = issue_table.rows[2].cells.item(1);
  var language_translation_issue_cell = issue_table.rows[3].cells.item(1);

  var success_label = "Success";
  var failed_label = "Failed";

  // Let's check if mp3 is supported by the browser or not
  if(is_mp3_supported()) // MP3 is supported
  {
    mp3_issue_cell.innerHTML = success_label;
  }
  else // MP3 is not supported
  {
    mp3_issue_cell.innerHTML = failed_label;
  }

  // Let's check iframe issue
  if(is_iframe_issue_present()) // iframe issue is present
  {
    iframe_issue_cell.innerHTML = failed_label;
  }
  else // iframe issue is not present
  {
    iframe_issue_cell.innerHTML = success_label;
  }

  // Let's check language translation issue
  if(is_language_translation_issue_present()) // Language translation issue is present
  {
    language_translation_issue_cell.innerHTML = failed_label;
  }
  else // Language translation issue is not present
  {
    language_translation_issue_cell.innerHTML = success_label;
  }
}, false);