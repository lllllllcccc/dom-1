window.dom = {
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)

    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, child) {
        parent.appendChild(child)
    },
    warp(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(parent) {

        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
        // for (let i = 0; i < parent.childNodes.length; i++) {
        //     dom.remove(parent.childNodes[i])
        // }

    },
    attr(node, key, values) {
        if (arguments.length === 2) {
            return node.getAttribute(key)
        }
        else if (arguments.length === 3) {
            node.setAttribute(key, values)
        }
    },
    text(node, string) {
        if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerHTML
            } else {
                return node.textContent
            }

        }
        else if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerHTML = string;
            } else {
                node.textContent = string
            }

        }
    },
    html(node, string) {
        if (arguments.length === 1) {
            return node.innerHTML
        }
        else if (arguments.length === 2) {
            node.innerHTML = string
        }
    },
    style(node, name, values) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = values
        } else if (arguments.length === 2) {
            //dom.style(div,'color')
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }

        }
    },
    class: {
        add(node, className) {
            return node.classList.add(className)
        },
        remove(node, className) {
            return node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        },
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.childNodes
    },
    sibling(node) {
        // array = []
        // for (let i = 0; i < node.parentNode.childNodes.length; i++) {
        //     if (node.parentNode.childNodes[i] != node) {
        //         array.push(node.parentNode.childNodes[i])
        //     }
        // }
        // return array
        return Array.from(node.parentNode.children).filter(n => n != node)

    },
    next(node) {
        //排除回车，导致下一个节点是文本
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {

        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodes, fn) {
        for (let i = 0; i < nodes.length; i++) {
            fn.call(null, nodes[i])
        }
    },
    index(node) {
        let i;
        for (i = 0; i < node.parentNode.childNodes.length; i++) {
            if (node.parentNode.childNodes[i] === node) {
                break;
            }
        }
        return i
    }


}