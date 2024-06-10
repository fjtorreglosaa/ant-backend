BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [cost] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [dailyWorkTime] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [changeoverFrequencyTime] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [changeoverFrequencyDistance] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [currentOperatingTime] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [currentOperatingDistance] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [distanceFromInstallation] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [timeFromInstallation] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [dailyWorkDistance] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [expectedServiceLife] DECIMAL NULL;
ALTER TABLE [dbo].[ComponentParamenters] ALTER COLUMN [expectedServiceDistance] DECIMAL NULL;

-- AlterTable
ALTER TABLE [dbo].[SubjectParamenters] ALTER COLUMN [currentOperatingTime] DECIMAL NULL;
ALTER TABLE [dbo].[SubjectParamenters] ALTER COLUMN [currentOperatingDistance] DECIMAL NULL;

-- AlterTable
ALTER TABLE [dbo].[UserDependencies] ADD [createdAt] DATETIME2,
[createdBy] UNIQUEIDENTIFIER,
[updatedAt] DATETIME2,
[updatedBy] UNIQUEIDENTIFIER;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
