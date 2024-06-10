export class DependencyContainer {

    private static instance: DependencyContainer;
    private dependencies = new Map<string, any>();

    private constructor() {}

    static getInstance(): DependencyContainer {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
    }

    register<T>(key: string, instance: T): void {
        this.dependencies.set(key, instance);
    }

    resolve<T>(key: string): T {
        const instance = this.dependencies.get(key);

        if (!instance) {
            throw new Error(`Dependency ${key} not found`);
        }

        return instance;
    }
}

const container = DependencyContainer.getInstance();
export { container };