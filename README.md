Docker compose 
-- Usar la composición como ultima opción. Hay un problema con la carpeta de logs del volumen que se crea en el proyecto (Generación desbordada de logs).
-- Opcion 1: Usar instancia local de SQL Server.
-- Opcion 2: Descargar la imagen de microsoft sql server y crear una base de datos llamada AntDB.
-- Opcion 3: Ejecutar si no se tiene una instancia de SQL Server (docker compose up -d). Nota: Borrar carpeta de logs

Generar base de datos (Usar si hay migraciones en prisma)
-- npx prisma migrate deploy
-- npx prisma generate

Migracion Inicial (Usar si no hay migraciones en prisma)
-- npx prisma migrate dev --name InitialModel