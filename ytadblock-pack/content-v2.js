function clicktry(doc, targets) {
    const obs = new MutationObserver(() => {
        let idc = doc.contentDocument || doc.contentWindow.document;
        targets.forEach(target => {
            let elm = idc.querySelector(target);
            if (elm) {
                //console.log('Element found:', elm);
                elm.click();
                //console.log('Element clicked:', target);
                targets = targets.filter(t => t !== target);
            }
        });
        if (targets.length === 0) {
            nextFrag = 2;
            obs.disconnect();
        }
    });
    doc.onload = () => {
        obs.observe(doc.contentDocument, {
            childList: true,
            subtree: true
        });
    };
}

function main() {
    console.log("search");
    if (nextFrag == 0) {
        // マイ アド センター
        let adButton = document.querySelector('.ytp-ad-button-icon');
        if (adButton) {
            nextFrag = 1;
            adButton.click();
            console.log('Ad button clicked');
            setTimeout(function() {
                let ifr = document.querySelector('yt-about-this-ad-renderer iframe#iframe');
                let targets = [
                    // 広告をブロック
                    'span.mUIrbf-vQzf8d',
                    // 続行
                    "div.U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.Zrq4w.WIL89.ffRi5e.Crd6fb.WvipBf-LgbsSe-LoDsGd.M9Bg4d"
                ];
                clicktry(ifr, targets);
            }, 500);
        }
    }
    if (nextFrag == 2) {
        let sc = document.querySelector("tp-yt-iron-overlay-backdrop");
        if (sc) {
            sc.click();
            //console.log('Backdrop clicked');
            nextFrag = 0;
        }
    }
}

function removeAd() {
    adthumbs = document.querySelectorAll("ytd-ad-slot-renderer");
    adthumbs.forEach(thumb => {
        thumb.closest('ytd-rich-item-renderer');
        thumb.outerHTML = '<h1 color="#ff0000">広告は消し去った！！</h1>';
    })
}

window.onload = function() {
    nextFrag = 0;
    p = setInterval(main, 500);
    q = setInterval(removeAd, 500);
}

function queryClick(selector) {
    target = document.querySelector(selector);
    target.click();
}