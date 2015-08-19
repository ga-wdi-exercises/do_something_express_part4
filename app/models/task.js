module.exports = function(sequelize, Sequelize){
  return sequelize.define("task", {
    content: Sequelize.TEXT
  });
}
