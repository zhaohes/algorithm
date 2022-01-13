class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    /* 插入子节点 */
    insert(key) {
        let newNode = new TreeNode(key);
        if (!this.root) {
            this.root = newNode;
        } else {
            //遍历树
            this.insertNode(this.root, newNode);
        }
    }
    /* 寻找最大值 */
    max() {
        let node = this.root;
        while (node.right) {
            node = node.right;
        }
        return node.key;
    }
    /* 寻找最小值 */
    min() {
        let node = this.root;
        while (node.left) {
            node = node.left;
        }
        return node.key;
    }
    /* 搜索特定值：使用递归 */
    search(key) {
        return this.searchNode(this.root, key);
    }
    /* 删除节点 */
    remove(key) {
        /*    
        1。查找到节点，没有则返回false。
        2.分情况对节点进行删除
        2.1如果节点是叶子节点
        2.2节点只有一个子节点
        2.3节点有连个字节点 
        */
        //1.查找到要删除的节点。
        let current = this.root;
        let isLeftChild = true;
        let parent = null;
        if (!this.root) return false;//假如是个空树,返回false
        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                current = current.left;
                isLeftChild = true;
            } else if (key > current.key) {
                current = current.right;
                isLeftChild = false;
            }
            if (!current) {
                return false;
            }
        }
        //current已经找到了。
        //2.1如果要删除的节点是叶子节点。
        if (!current.left && !currrent.right) {
            //current节点是父节点的左子节点
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        //2.2要删除的节点只有一个左子节点。
        else if (current.left && !current.right) {
            if (current === this.root) {
                this.root = current.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        }
        //2.2要删除的节点只有一个右子节点。
        else if (current.right && !current.left) {
            if (current === this.root) {
                this.root = current.root;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }
        /* 
        要删除的current节点有左右两个子节点,
        这种时候需要把current的左子树的节点提上去，或者右子树的节点提上去。
        需要满足的条件是:左子树比current小一点点和右子树比current大一点点
        左子树比current小一点点的就是current的前驱，也就是左子树的最右边的节点。
        右子树比current大一点的的就是current的后继，也就是右子树的最左的节点。
        所以首先要找到这个后继节点或者前驱，这里我们来找后继。
        */
        else {
            let successor = this.getSuccessor(current);
            if (current === this.root) {
                this.root = successor;
            } else {
                if (isLeftChild) {
                    parent.left = successor
                } else {
                    parent.right = successor;
                }
            }
            successor.left = current.left;
        }
    }
    getSuccessor(delNode) {
        let successor = delNode;
        let successorParent = null;
        let current = delNode.right;
        while (current != null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }
        /* 如果后继节点不是删除节点的直接右节点 */
        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }
        return successor;

    }
    getPioneer(delNode) {
        let pionerr = delNode.left;
        while (pionerr.right) {
            pionerr = pionerr.right;
        }
        return pionerr;
    }
    /* 使用循环写 */
    searchV2(key) {
        let node = this.root;
        while (node != null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return node;
            }
        }
        return null;
    }
    searchNode(node, key) {
        if (!node) return null;
        if (node.key === key) {
            return node;
        } else if (key < node.key) {
            return this.searchNode(node.left, key)
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        }
        return null;
    }
    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            //插入左子树
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    preOrderTraversalNode(node, handler) {
        if (!!node) {
            handler(node);
            this.preOrderTraversalNode(node.left, handler);
            this.preOrderTraversalNode(node.right, handler);
        }
    }
    middleOrderTraversalNode(node, handler) {
        if (!!node) {
            this.middleOrderTraversalNode(node.left, handler);
            handler(node);
            this.middleOrderTraversalNode(node.right, handler);
        }
    }
    postOrderTraversalNode(node, handler) {
        if (!!node) {
            this.postOrderTraversalNode(node.left, handler);
            this.postOrderTraversalNode(node.right, handler);
            handler(node);
        }
    }
    /* 中序遍历 */
    middleOrderTraversal(handler) {
        this.middleOrderTraversalNode(this.root, handler);
    }
    /* 后序遍历 */
    postOrderTraversal(handler) {
        this.postOrderTraversalNode(this.root, handler);
    }
    /* 前序遍历 */
    preOrderTraversal(handler) {
        this.preOrderTraversalNode(this.root, handler);
    }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(11);
binarySearchTree.insert(7);
binarySearchTree.insert(15);
binarySearchTree.insert(5);
binarySearchTree.insert(3);
binarySearchTree.insert(9);
binarySearchTree.insert(8);
binarySearchTree.insert(10);
binarySearchTree.insert(13);
binarySearchTree.insert(12);
binarySearchTree.insert(14);
binarySearchTree.insert(20);
binarySearchTree.insert(18);
binarySearchTree.insert(25);
binarySearchTree.insert(6);
let arr = [];
binarySearchTree.preOrderTraversal(function (node) {
    arr.push(node.key);
});

// console.log(arr)[11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]
let arr2 = [];
binarySearchTree.middleOrderTraversal(function (node) {
    arr2.push(node.key);
});
//console.log(arr2);//[3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]

let arr3 = [];
binarySearchTree.postOrderTraversal(function (node) {
    arr3.push(node.key);
});
//console.log(arr3);// [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]

let min = binarySearchTree.min();
// console.log(min)

let max = binarySearchTree.max();
// console.log(max)

// let node = binarySearchTree.search(5);
// console.log(node)

// let node2 = binarySearchTree.searchV2(14);
// console.log(node2)

// binarySearchTree.remove(9);
// binarySearchTree.remove(7);
// binarySearchTree.remove(15);
// let arr4 = [];
// binarySearchTree.postOrderTraversal(function (node) {
//     arr4.push(node.key);
// });
// console.log(arr4);// [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]