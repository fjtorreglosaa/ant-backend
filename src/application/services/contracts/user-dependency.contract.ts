export interface IUserDependencyService {
    createUserDependencies(): Promise<Boolean>;
    updateUserDependencies(): Promise<Boolean>;
    removeUserDependencies(): Promise<Boolean>;
}