function RedBlackTree() {
  this.nil = new RedBlackNode();
  this.nil.color = "black";
  this.nil.left = this.nil;
  this.nil.right = this.nil;
  this.nil.key = "nil";

  this.root = this.nil;

  this.rotateLeft = function(tree, x) {
    var y = x.right;
    x.right = y.left;

    if(y.left != tree.nil) {
      y.left.parent = x;
    }

    y.parent = x.parent;

    if(x.parent == tree.nil) {
      tree.root = y;
    }
    else if(x == x.parent.left) {
      x.parent.left = y;
    }
    else {
      x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
  };

  this.rotateRight = function(tree, y) {
    var x = y.left;
    y.left = x.right;

    if(x.right != tree.nil) {
      x.right.parent = y;
    }

    x.parent = y.parent;

    if(y.parent == tree.nil) {
      tree.root = x;
    }
    else if(y == y.parent.right) {
      y.parent.right = x;
    }
    else {
      y.parent.left = x;
    }

    x.right = y;
    y.parent = x;
  };

  this.insert = function(tree, key) {
    var z = new RedBlackNode();
    z.left = tree.nil;
    z.right = tree.nil;
    z.color = "red";
    z.key = key;

    var y = tree.nil;
    var x = tree.root;

    while(x != tree.nil) {
      y = x;
      if(z.key < x.key) {
        x = x.left;
      }
      else {
        x = x.right;
      }
    }

    z.parent = y;

    if(y != tree.nil) {
      if(z.key < y.key) {
        y.left = z;
      }
      else {
        y.right = z;
      }
    }
    else {
      tree.root = z;
    }

    this.insertFixup(tree, z);
  };

  this.insertFixup = function(tree, z) {
    while(z != tree.root && z.parent.color == "red") {
      if(z.parent == z.parent.parent.left) {
        var y = z.parent.parent.right;
        if(y.color == "red") {
          z.parent.color = "black";
          y.color = "black";
          z.parent.parent.color = "red";
          z = z.parent.parent;
        }
        else {
          if(z == z.parent.right) {
            z = z.parent;
            this.rotateLeft(tree, z);
          }
          z.parent.color = "black";
          z.parent.parent.color = "red";
          this.rotateRight(tree, z.parent.parent);
        }
      }
      else {
        var y = z.parent.parent.left;
        if(y.color == "red") {
          z.parent.color = "black";
          y.color = "black";
          z.parent.parent.color = "red";
          z = z.parent.parent;
        }
        else {
          if(z == z.parent.left) {
            z = z.parent;
            this.rotateRight(tree, z);
          }
          z.parent.color = "black";
          z.parent.parent.color = "red";
          this.rotateLeft(tree, z.parent.parent);
        } 
      }
    }

    tree.root.color = "black";
  };

  this.find = function(tree, z, key) {
    if(z == tree.nil || key == z.key) {
      return z;
    }

    if(key < z.key) {
      return this.find(tree, z.left, key);
    }
    else {
      return this.find(tree, z.right, key);
    }
  }

  this.deleteNode = function(tree, z) {
    var y;
    var x;
    if(z.left == tree.nil || z.right == tree.nil) {
      y = z;
    }
    else {
      y = this.successor(tree, z);
    }

    if(y.left != tree.nil) {
      x = y.left;
    }
    else {
      x = y.right;
    }

    x.parent = y.parent;

    if(y.parent == tree.nil) {
      tree.root = x;
    }
    else if(y == y.parent.left) {
      y.parent.left = x;
    }
    else {
      y.parent.right = x;
    }

    if(y != z) {
      z.key = y.key;
    }

    if(y.color == "black") {
      this.deleteFixup(tree, x);
    }
  };

  this.deleteFixup = function(tree, z) {
    var w;
    while(z != tree.root && z.color == "black") {
      if(z == z.parent.left) {
        w = z.parent.right;
        if(w.color == "red") {
          w.color = "black";
          z.parent.color = "red";
          this.rotateLeft(tree, z.parent);
          w = z.parent.right;
        }

        if(w.left.color == "black" && w.right.color == "black") {
          w.color = "red";
          z = z.parent;
        }
        else {
          if(w.right.color == "black") {
            w.left.color = "black";
            w.color = "red";
            this.rotateRight(tree, w);
            w = z.parent.right;
          }

          w.color = z.parent.color;
          z.parent.color = "black";
          w.right.color = "black";
          this.rotateLeft(tree, z.parent);
          z = tree.root;
        }
      }
      else {
        w = z.parent.left;
        if(w.color == "red") {
          w.color = "black";
          z.parent.color = "red";
          this.rotateRight(tree, z.parent);
          w = z.parent.left;
        }

        if(w.right.color == "black" && w.left.color == "black") {
          w.color = "red";
          z = z.parent;
        }
        else {
          if(w.left.color == "black") {
            w.right.color = "black";
            w.color = "red";
            this.rotateLeft(tree, w);
            w = z.parent.left;
          }

          w.color = z.parent.color;
          z.parent.color = "black";
          w.right.color = "black";
          this.rotateRight(tree, z.parent);
          z = tree.root;
        }
      }
    }
    z.color = "black";
  };

  this.successor = function(tree, z) {
    if(z.right != tree.nil) {
      return this.min(tree, z.right);
    }

    var y = z.parent;

    while(y != tree.nil && z == y.right) {
      z = y;
      y = y.parent;
    }

    return y;
  };

  this.min = function(tree, z) {
    while(z.left != tree.nil) {
      z = z.left;
    }

    return z;
  };
}

function RedBlackNode() {
  this.left = null;
  this.right = null;
  this.parent = null;

  this.color = "";
  this.key = null;
}
