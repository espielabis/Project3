module.exports = function(sequelize, DataTypes) {

      var db = require("../models");
      var Roommate = sequelize.define("Roommate", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_initial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
        }
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1]
          }
      });

    Roommate.associate = function(models) {
        Roommate.hasMany(models.Rating, {
            onDelete: "CASCADE"
        });

        Roommate.belongsToMany(models.User, {through: 'usersRoommate'})
    }
      return Roommate;
  };
