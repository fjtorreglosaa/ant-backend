import { DependencyRegistrar, container, envs } from "./config/plugins";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})();

function main() {

    DependencyRegistrar.registerDependencies();

    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes( container )
    })

    server.start();
}