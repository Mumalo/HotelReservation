export interface CrudRepository<T, ID> {
    save(item: T): Promise<T>

    delete(item: ID): Promise<boolean>
}
