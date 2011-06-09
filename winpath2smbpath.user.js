// ==UserScript==
// @name           Windows Path 2 SMB Path
// @namespace      http://abicky.site90.com/
// @include        https://mail.google.com/mail/*#inbox*
// @description    Convert Windows path to Unix path in Gmail
// ==/UserScript==

(function() {
        var mailframe = document.getElementById('canvas_frame');
        mailframe.contentDocument.addEventListener('click', function() {
            var mails = this.getElementsByClassName('gs');
            for (var i = 0; i < mails.length; i++) {
                var body = mails[i].getElementsByClassName('ii gt');
                for (var j = 0; j < body.length; j++) {
                    body[j].innerHTML = body[j].innerHTML.replace(/\\\\(?:[^\s<]|<wbr>)+/,
                                                                  function(path) {
                                                                      path = path.replace(/<.*?>/g, '');
                                                                      path = 'smb:' + path.replace(/\\/g, '/');
                                                                      return '<a href="' + path + '">' + path + '</a>';
                                                                  });
                }
            }
        }, false);
})();
