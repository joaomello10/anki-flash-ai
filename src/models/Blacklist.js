import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Word = sequelize.define('Word', {
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export default Word;
