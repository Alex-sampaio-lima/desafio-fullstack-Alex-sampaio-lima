import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import Contact from "./contact.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("client")
export default class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 120 })
    name: string;

    @Column({ length: 255 })
    password: string;

    @Column({ nullable: true })
    tel: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registrationDate: string | Date;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(() => Contact, (contact) => contact.client)
    contact: Contact[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const hashRounds: number = getRounds(this.password)

        if (!hashRounds) {
            this.password = hashSync(this.password, 10)
        }
    }
}









