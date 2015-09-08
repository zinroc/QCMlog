zinrocfantasy
=============

## List of Proposed Efficiency Improvements

### Motivation
I notice very slow load times, especially on Heroku. Also Angular is a bit slow, so will have to compensate for this. 
I like Angular very much; the simplicity it adds is probably worth the performance penalty

### Suggestions Made By Google Speed Test

* minify JS and CSS files on commit
* enable compression on the server (local and remote)
* load Angular, Bootstrap, JQuery from CDN when running on Heroku
* load JS at the bottom of the page

### Personal Suggestions
* remove Bootstrap js from views where it's not needed
* use server-side caching (maybe memcached, or something like that)
* use client-side caching (esp. for items which do not change, like getActionTypes, getAttractionTypes, etc.)
* use localStorage between timesteps
* improve server response times (optimize PHP code, use prepared statements and SQL native functions)
* remove character data type, stop using rtrim in code

## List of proposed major changes in order of priority

### Proposed Features
  * add full action collaboration, including consistent evaluation
  
### Design Changes
  * stop using `site_url` for API calls, instead add this as a JS module (since these URLs likely won't change over time)

#### Advantages of replacing `site_url` with JS
 * makes code more straightforward to read
 * allows externalization of JS code, to clean up views
