var RedBlackTreeView = Backbone.View.extend(
  {
    initialize: function() {
      this.model.bind("change", _.bind(this.render, this));
    },
    render: function() {
      var template = _.template( $("#inorderList-template").html(), {} );
      this.$el.html(template);
    },
    walk: function(tree, x) {
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
  });
