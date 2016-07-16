const electron = require('electron');
const app = electron.app;
const clipboard = electron.clipboard;
let clipboardUI = null;

let supportedTypeConstants = {
    plainText: "text/plain",
    html: "text/html",
    bookmark: "object/bookmark"
}

class ClipboardItem {
    constructor() {
        this.format = "";
        this.description = "";
        this.value = null;
    }
}

class ClipboardHtmlItem {
    constructor() {
        this.format = supportedTypeConstants.plainText;
        this.description = "";
        this.value = clipboard.readHTML();
    }
}

class ClipboardBookmarkItem {
    constructor() {
        this.format = supportedTypeConstants.bookmark;
        this.description = "";
        this.value = clipboard.readBookmark();
    }
}

class ClipboardItemFactory {
    createTextItem() {
        let value = clipboard.readBookmark();

        if (value) {
            return new ClipboardBookmarkItem();
        }
    }


    createHtmlItem() {
        return new ClipboardHtmlItem();
    }

    createClipboardItem() {
        const availableFormats = clipboard.availableFormats();

        if (availableFormats.indexOf(supportedTypeConstants.html) > -1) {
            return this.createHtmlItem();
        }
        else if (availableFormats.indexOf(supportedTypeConstants.plainText) > -1) {
            return this.createTextItem();
        }
    }
}


class ClipboardUI {
    constructor() {
        this.factory = new ClipboardItemFactory();
        this.btnAdd = document.getElementById('btnGetFromClipboard');
        this.lblFormat = document.getElementById('clpType');

        this.btnAdd.addEventListener('click', this.addFromClipboard.bind(this));
        this.clipboardItems = [];
    }

    addFromClipboard() {
        this.clipboardItems.push(this.factory.createClipboardItem());
    }
}

onload = function() {
    console.log('loading');
    clipboardUI = new ClipboardUI();
};
