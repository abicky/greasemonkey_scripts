// ==UserScript==
// @name           Windows Path 2 SMB Path
// @namespace      http://abicky.site90.com/
// @include        https://mail.google.com/mail/*#*
// @description    Convert Windows path (UNC) to SMB path in Gmail
// ==/UserScript==

function winpath2smbpath() {
    var mailframe = document.getElementById('canvas_frame');
    if (mailframe != null) {
        mailframe.contentDocument.addEventListener('click', function() {
            var mails = this.getElementsByClassName('gs');
            for (var i = 0; i < mails.length; i++) {
                var body = mails[i].getElementsByClassName('ii gt');
                for (var j = 0; j < body.length; j++) {
                    body[j].innerHTML = body[j].innerHTML
                        .replace(/\\\\(?:[^\s<]|<wbr>|<\/?span[^>]*>)+/,
                                 function(path) {
                                     path = path.replace(/<.*?>/g, '');
                                     path = 'smb:' + path.replace(/\\/g, '/');
                                     return '<a href="' + path.substring(0, path.lastIndexOf('/')) + '">' + path + '</a>';
                                 });
                }
            }
        }, false);
    } else {
        setTimeout(winpath2smbpath, 1000);
    }
}

setTimeout(winpath2smbpath, 1000);
