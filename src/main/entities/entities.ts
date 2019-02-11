import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn() key!: number;

    @Column() name!: string;

    @ManyToMany(() => Entitlement, { eager: true }) @JoinTable() entitlements!: Entitlement[];
}

@Entity()
export class Entitlement {
    @PrimaryColumn() identifier!: string;

}
