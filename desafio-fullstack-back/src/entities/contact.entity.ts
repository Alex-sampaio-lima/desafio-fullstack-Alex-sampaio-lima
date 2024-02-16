import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Client from "./client.entity";

@Entity("contact")
export default class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: "text" })
    tel: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registrationDate: string | Date;

    @Column({ type: "text" })
    clientId: string;
    
    @ManyToOne(() => Client, (client) => client.contact, { onDelete: "CASCADE" })
    client: Client;

}