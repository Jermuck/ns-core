import { LogEntity } from "@prisma/client";

export abstract class AbstractLogRepository {
    abstract create(log: string): Promise<LogEntity>;
    abstract delete(id: string): Promise<LogEntity>;
    abstract findMany(): Promise<LogEntity[]>;
}