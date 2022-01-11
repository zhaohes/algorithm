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
    /* 搜索特定值 */
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (!node) return null;
        if (node.key === key) {
            return node;
        }
        let re = this.searchNode(node.left, key)
        if (re) {
            return re;
        }
        return this.searchNode(node.right, key) || null;
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

let node = binarySearchTree.search(5);
// console.log(node)