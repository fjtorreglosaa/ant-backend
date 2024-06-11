BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Subjects] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [name] VARCHAR(max),
    [tag] VARCHAR(50),
    [internalCode] VARCHAR(50),
    [isActive] BIT,
    [image] NVARCHAR(max),
    [dependencyId] UNIQUEIDENTIFIER,
    [subjectTypeId] UNIQUEIDENTIFIER,
    [subjectParameterId] UNIQUEIDENTIFIER,
    [locationId] UNIQUEIDENTIFIER,
    [createdBy] VARCHAR(50),
    [updatedBy] VARCHAR(50),
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Subjects_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[SubjectTypes] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] VARCHAR(max),
    [isActive] BIT,
    [createdBy] VARCHAR(50),
    [updatedBy] VARCHAR(50),
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [SubjectTypes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Dependencies] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [parentId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    [userDependencyId] UNIQUEIDENTIFIER,
    CONSTRAINT [Dependencies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Components] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [image] NVARCHAR(max),
    [parentId] UNIQUEIDENTIFIER,
    [equipmentId] UNIQUEIDENTIFIER,
    [systemId] UNIQUEIDENTIFIER,
    [manufacturerId] UNIQUEIDENTIFIER,
    [statusId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Components_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Statuses] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [description] NVARCHAR(max),
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Statuses_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SubjectParamenters] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [model] NVARCHAR(50),
    [series] NVARCHAR(50),
    [currentOperatingTime] DECIMAL,
    [currentOperatingDistance] DECIMAL,
    [warrantyTime] INT,
    [warrantyDistance] INT,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [SubjectParamenters_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ComponentParamenters] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [model] NVARCHAR(50),
    [series] NVARCHAR(50),
    [internalCode] NVARCHAR(50),
    [externalCode] NVARCHAR(50),
    [cost] DECIMAL,
    [dailyWorkTime] DECIMAL,
    [estimatedChangeoverDate] DATETIME2,
    [changeoverFrequencyTime] DECIMAL,
    [changeoverFrequencyDistance] DECIMAL,
    [currentOperatingTime] DECIMAL,
    [currentOperatingDistance] DECIMAL,
    [distanceFromInstallation] DECIMAL,
    [timeFromInstallation] DECIMAL,
    [dailyWorkDistance] DECIMAL,
    [expectedServiceLife] DECIMAL,
    [expectedServiceDistance] DECIMAL,
    [manufacterId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [ComponentParamenters_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Locations] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Locations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Manufacturers] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Manufacturers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Systems] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(max),
    [parentId] UNIQUEIDENTIFIER,
    [description] NVARCHAR(max),
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Systems_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ComponentChanges] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] VARCHAR(max),
    [description] NVARCHAR(max),
    [installationDate] DATETIME2,
    [removalDate] DATETIME2,
    [workOrderId] NVARCHAR(50),
    [workDescription] NVARCHAR(max),
    [technniciansObservations] NVARCHAR(max),
    [newComponent] BIT,
    [repairedComponent] BIT,
    [warrantyComponent] BIT,
    [shouldBeDisposed] BIT,
    [isAPartialRepair] BIT,
    [isATotalRepair] BIT,
    [isAWarranty] BIT,
    [installedComponentId] UNIQUEIDENTIFIER,
    [uninstalledComponentId] UNIQUEIDENTIFIER,
    [document] NVARCHAR(max),
    [image] NVARCHAR(max),
    [statusId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [ComponentChanges_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserDependencies] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [userId] UNIQUEIDENTIFIER,
    [dependencyId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [UserDependencies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(50),
    [profileId] UNIQUEIDENTIFIER,
    [email] NVARCHAR(100),
    [password] NVARCHAR(max),
    [isActive] BIT,
    [userDependencyId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Profiles] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [username] NVARCHAR(50),
    [preferences] NVARCHAR(max),
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Profiles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProfileRoles] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [roleId] UNIQUEIDENTIFIER,
    [profileId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [ProfileRoles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(50),
    [description] NVARCHAR(max),
    [isCustom] BIT,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Roles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RolePermissions] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [roleId] UNIQUEIDENTIFIER,
    [permissionId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [RolePermissions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Permissions] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(50),
    [description] NVARCHAR(max),
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Permissions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Invitations] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [verificationCode] SMALLINT,
    [statusId] UNIQUEIDENTIFIER,
    [isActive] BIT,
    [expirationDate] DATETIME2,
    [createdBy] UNIQUEIDENTIFIER,
    [updatedBy] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2,
    [updatedAt] DATETIME2,
    CONSTRAINT [Invitations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Subjects] ADD CONSTRAINT [Subjects_dependencyId_fkey] FOREIGN KEY ([dependencyId]) REFERENCES [dbo].[Dependencies]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Subjects] ADD CONSTRAINT [Subjects_subjectTypeId_fkey] FOREIGN KEY ([subjectTypeId]) REFERENCES [dbo].[SubjectTypes]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Subjects] ADD CONSTRAINT [Subjects_subjectParameterId_fkey] FOREIGN KEY ([subjectParameterId]) REFERENCES [dbo].[SubjectParamenters]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Subjects] ADD CONSTRAINT [Subjects_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Locations]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dependencies] ADD CONSTRAINT [Dependencies_userDependencyId_fkey] FOREIGN KEY ([userDependencyId]) REFERENCES [dbo].[UserDependencies]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Components] ADD CONSTRAINT [Components_systemId_fkey] FOREIGN KEY ([systemId]) REFERENCES [dbo].[Systems]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Components] ADD CONSTRAINT [Components_manufacturerId_fkey] FOREIGN KEY ([manufacturerId]) REFERENCES [dbo].[Manufacturers]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Components] ADD CONSTRAINT [Components_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[Statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ComponentChanges] ADD CONSTRAINT [ComponentChanges_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[Statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ComponentChanges] ADD CONSTRAINT [ComponentChanges_installedComponentId_fkey] FOREIGN KEY ([installedComponentId]) REFERENCES [dbo].[Components]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_userDependencyId_fkey] FOREIGN KEY ([userDependencyId]) REFERENCES [dbo].[UserDependencies]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileRoles] ADD CONSTRAINT [ProfileRoles_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Roles]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileRoles] ADD CONSTRAINT [ProfileRoles_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermissions] ADD CONSTRAINT [RolePermissions_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Roles]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermissions] ADD CONSTRAINT [RolePermissions_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permissions]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
