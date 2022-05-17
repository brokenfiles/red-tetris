export type SerializeContext = {
    groups: string[]
}
export interface ISerializable<T> {

    serialize (context?: SerializeContext): T;

}
