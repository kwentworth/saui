saui
=============

SAUI is the core JS interface library we use for [Site Avenger CMS](http://www.siteavenger.com/).  We hope some of these features will have broad appeal to you and your projects. 



Installation
-----------

    include javascript file in any x/html application
    
Usage
-----------

	<script type="text/javascript" src="//saui.siteavenger.com/js/saui.attach.js" />

License
-----
MIT

Roadmap
------------
* [RequireJS](http://requirejs.org/)
* Exclusive use of jquery [pjax](https://github.com/defunkt/jquery-pjax) for all ajax content requests

Contributing
------------

Yes, please. More coming soon.

The Manual
------------

##### saui function overview

function | called | description | usage
----|---------|------------|------------
`attach` | attach | attaches the library on document.ready()  | saui.anyFunctionName();
`ajaxLoader` | attach; manual | used to load content into a div | add .saui-ajax-loader class
`loader` | attach; manual | used to load non-bindable javascript events | saui.loader(document);
