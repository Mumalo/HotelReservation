export interface ReadRepository<ID> {
    exists(id: ID): Promise<boolean>

    findById(id: ID): Promise<any>
}
