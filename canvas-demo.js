var rbtree = new RedBlackTree();

window.onload = function() {
  var url = "http://localhost/lib/js/redblack.js";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if(request.status == 200) {
      var redblack_js = document.getElementById("redblack_js");
      var txt = document.createTextNode(request.responseText);
      redblack_js.appendChild(txt);
    }
    else {
      var redblack_js = document.getElementById("redblack_js");
      var txt = document.createTextNode("Unable to locate Red/Black Tree source.");
      redblack_js.appendChild(txt);
    }
  };

  request.send(null);
}

var getHeight = function(tree, z) {
  if(z != tree.nil) {
    var lheight = getHeight(tree, z.left);
    var rheight = getHeight(tree, z.right);

    if(lheight > rheight)
      return lheight+1;
    else
      return rheight+1;
  }
  else {
    return 0;
  }
}

var levelOrderWalk = function(tree, z, c, ctx) {
  z.xOffset = Math.floor(c.width/2);
  var h = getHeight(tree, z);
  for(var i=1;i<=h;i++) {
    displayLevel(tree, z, c, ctx, i*100, i, i);
  }
}

var displayLevel = function(tree, z, c, ctx, y, level, actual) {
  if(z != tree.nil) {
    if(level == 1) {
      var h = getHeight(tree, tree.root);

      var x;
      if(z == tree.root) {
        x = z.xOffset;
      }
      else {
        x = z.parent.xOffset;
        if(z == z.parent.left) {
          x = x - (50*(h - actual+1));
        }
        else {
          x = x + (50*(h - actual+1));
        }
        z.xOffset = x;
      }

      z.yOffset = y;

      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2*Math.PI);
      ctx.fillStyle = z.color;
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font="25px Arial";

      var met = ctx.measureText(z.key);
      var width = met.width;
      var height = 25-3; // Same as font size -3
      ctx.fillText(z.key, Math.floor(x-width/2), Math.ceil(y+height/2));


      if(z.parent != tree.nil) {
        ctx.moveTo(z.xOffset, y-30);
        ctx.lineTo(z.parent.xOffset, z.parent.yOffset+30);
        ctx.stroke();
      }

      console.log("key: " + z.key);
    }
    else if(level > 1) {
      displayLevel(tree, z.left, c, ctx, y, level-1, actual);
      displayLevel(tree, z.right, c, ctx, y, level-1, actual);
    }
  }
}

var addNode = function() {
  var valueToAdd = document.getElementById("addNodeText");
  var iVal = valueToAdd.value;

  if($.isNumeric(iVal)) {
    rbtree.insert(rbtree, iVal);

    var c = document.getElementById("tree");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    levelOrderWalk(rbtree, rbtree.root, c, ctx);
  }
  else {
    console.log("Not a number: " + iVal);
  }
}

var removeNode = function() {
  var valueToRemove = document.getElementById("removeNodeText");
  var iVal = valueToRemove.value;

  if($.isNumeric(iVal)) {
    var node = rbtree.find(rbtree, rbtree.root, iVal);

    if(node != rbtree.nil) {
      rbtree.deleteNode(rbtree, node);

      var c = document.getElementById("tree");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);

      levelOrderWalk(rbtree, rbtree.root, c, ctx);
    }
    else {
      console.log("Not in tree: " + iVal);
    }
  }
  else {
    console.log("Not a number: " + iVal);
  }
}
