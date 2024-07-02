import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;

  password: string;

  username: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0b001,
  })
  role: number;
}
