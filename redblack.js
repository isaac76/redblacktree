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

  this.walk = function(tree, x) {
    if(x != tree.nil) {
      this.walk(tree, x.left);

      var ul = document.getElementById("tree");
      var li = document.createElement("li");
      li.innerHTML = x.key;
      ul.appendChild(li);
      if(x.color == "red") {
        li.style.color = "red";
      }

      this.walk(tree, x.right);
    }
  }
}

function RedBlackNode() {
  this.left = null;
  this.right = null;
  this.parent = null;

  this.color = "";
  this.key = null;
}
