export interface UseCaseInterface<T> {
  execute: (...data: any) => Promise<T>;
}
