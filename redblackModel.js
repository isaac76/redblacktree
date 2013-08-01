var RedBlackNodeModel = Backbone.Model.extend(
  {
    defaults: {
      left: null,
      right: null,
      parent: null,
      color: "",
      key: null,
      changed: false
    }
  });

var RedBlackTreeModel = Backbone.Model.extend(
  {
    defaults: {
      changed: false
    },
    initialize: function() {
      this.nil = new RedBlackNodeModel();
      this.nil.color = "black";
      this.nil.left = this.nil;
      this.nil.right = this.nil;

      this.root = this.nil;
    },
    rotateLeft: function(tree, x) {
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
    },
    rotateRight: function(tree, y) {
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
    },
    insert: function(tree, key) {
      var z = new RedBlackNodeModel();
      z.left = tree.nil;
      z.right = tree.nil;
      z.color = "red";
      z.set("key", key);
      z.key = key;
      z.set("changed", true);
      this.set("changed", true);

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
    },
    insertFixup: function(tree, z) {
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
    }
  });
