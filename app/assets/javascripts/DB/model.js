function DBModel(modelName){
  var DB = this;

  function dbQuery(method, urlParams, data){
    var url = urlParams.join("/");
    return $.ajax({
      method: method,
      contentType: "application/json",
      url: url,
      data: data ? JSON.stringify(data) : null
    })
  }

  DB.model = {
    index: function(){
      return dbQuery("get", [modelName])
    }
  }

  DB.prototype.model = {
    data: {},
    show: function(){
      return dbQuery("get", [modelName, DB.data.id])
    },
    create: function(params){
      return dbQuery("post", [modelName], params)
    },
    edit: function(params){
      return dbQuery("patch", [modelName, DB.data.id], params)
    },
    delete: function(){
      return dbQuery("delete", [modelName, DB.data.id])
    }
  }

}
