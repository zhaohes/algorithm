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
    /* 插入 */
    insert(key) {
        let node = new TreeNode(key);
        if (!this.root) {
            this.root = node;
        } else {
            let current = this.root;
            while (current) {
                if (key < current.key) {
                    if (!current.left) {
                        current.left = node;
                        return true;
                    } else {
                        current = current.left;
                    }
                } else if (key > current.key) {
                    if (!current.right) {
                        current.right = node;
                        return true;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
        return false;
    }
    insert2(key) {
        let node = new TreeNode(key);
        if (!this.root) {
            this.root = node;
            return true;
        }
        this.__insert(this.root, node);
    }
    __insert(parent, node) {
        if (node.key < parent.key) {
            if (!parent.left) {
                parent.left = node;
                return true;
            } else {
                return this.__insert(parent.left, node);
            }
        } else if (node.key > parent.key) {
            if (!parent.right) {
                parent.right = node;
                return true;
            } else {
                return this.__insert(parent.right, node);
            }
        }
        return false;
    }
    /* 前序遍历 */
    preOrderTraversal(handler) {
        this.__preOrderTraversal(this.root, handler);
    }
    /* 中序遍历 */
    middleOrderTraversal(handler) {
        this.__middleOrderTraversal(this.root, handler);
    }
    __preOrderTraversal(node, handler) {
        if (!node) return;
        handler(node);
        this.__preOrderTraversal(node.left, handler);
        this.__preOrderTraversal(node.right, handler);
    }
    __middleOrderTraversal(node, handler) {
        if (!node) return;
        this.__middleOrderTraversal(node.left, handler);
        handler(node);
        this.__middleOrderTraversal(node.right, handler);
    }
    min() {
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        return current.key;
    }
    max() {
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        return current.key
    }
    search(key) {
        let current = this.root;
        while (current.key !== key) {
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            }
            if (!current) {
                return null;
            }
        }
        return current.key;
    }
    remove(key) {
        if (!this.root) return null;

    }

}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert2(11);
binarySearchTree.insert2(7);
binarySearchTree.insert2(15);
binarySearchTree.insert2(5);
binarySearchTree.insert2(3);
binarySearchTree.insert2(9);
binarySearchTree.insert2(8);
binarySearchTree.insert2(10);
binarySearchTree.insert2(13);
binarySearchTree.insert2(12);
binarySearchTree.insert2(14);
binarySearchTree.insert2(20);
binarySearchTree.insert2(18);
binarySearchTree.insert2(25);
binarySearchTree.insert2(6);
// let str = '';
// binarySearchTree.middleOrderTraversal(function (node) {
//     str += ' ' + node.key;
// })
// console.log(binarySearchTree)
// console.log(str)
// console.log(binarySearchTree.max())
// console.log(binarySearchTree.min())
console.log(binarySearchTree.search(7))