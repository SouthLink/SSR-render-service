function getLastEvent() {
    let lastEvent;
    ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
        document.addEventListener(eventType, (event) => {
            lastEvent = event;
        }, {
            capture: true,//捕获阶段
            passive: true//默认不阻止默认事件
        });
    });
    return lastEvent;
}


function getSelectors(path) {
    return path.reverse().filter(element => {
        return element !== document && element !== window;
    }).map(element => {
        let selector = "";
        if (element.id) {
            return `${element.nodeName.toLowerCase()}#${element.id}`;
        } else if (element.className && typeof element.className === 'string') {
            return `${element.nodeName.toLowerCase()}.${element.className}`;
        } else {
            selector = element.nodeName.toLowerCase();
        }
        return selector;
    }).join(' ');
}

function getSelector(pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {//可能是一个数组
        return getSelectors(pathsOrTarget);
    } else {//也有可有是一个对象 
        let path = [];
        while (pathsOrTarget) {
            path.push(pathsOrTarget);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return getSelectors(path);
    }
}

function onload(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

export {
    getLastEvent,
    getSelector,
    onload
}