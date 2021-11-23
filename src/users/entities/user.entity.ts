
import { AccountStatusEntity } from 'src/account-status/models/account-status.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @OneToOne(() => AccountStatusEntity, accountStatus => accountStatus.name)
  @JoinColumn()
  account_status: AccountStatusEntity;

}
