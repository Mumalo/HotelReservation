export interface IService<T, ID> {
    delete(id: ID): Promise<boolean>

    save(item: T): Promise<T>
}
