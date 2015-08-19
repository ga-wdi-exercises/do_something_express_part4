module.exports = function(sequelize, Sequelize){
  return sequelize.define("list", {
    title: Sequelize.STRING
  });
}
