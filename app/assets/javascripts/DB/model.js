function DBModel(apiPath){
  var DB = this;

  function dbQuery(method){
    var urlParams = [apiPath];
    var data = {};
    if(["patch", "delete", "post"].indexOf(method) > -1){
      if(method != "post") urlParams.push(this.data.id);
      data = this.params.call(this);
    }
    return $.ajax({
      method: method,
      contentType: "application/json",
      url: urlParams.join("/"),
      data: JSON.stringify(data)
    })
  }

  DB.model = {
    index: function(){
      return dbQuery.call(this, "get")
    }
  }

  DB.prototype.model = {
    data: {},
    create: function(){
      return dbQuery.call(this, "post")
    },
    edit: function(){
      return dbQuery.call(this, "patch")
    },
    delete: function(){
      return dbQuery.call(this, "delete")
    }
  }

}
