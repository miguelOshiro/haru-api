import { Permission } from "../../entities/permission.entity";
import { DataSource } from "typeorm";

export async function PermissionSeed(dataSource: DataSource) {
    const repo = dataSource.getRepository(Permission);
  
    const exists = await repo.findOneBy({ value: '/api/account/me' });
  
    if (!exists) {
      await repo.save({
        id: 1,
        value: '/v1/account/me', 
        action: 'GET',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 2,
        value: '/v1/account/avatar', 
        action: 'PUT',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 3,
        value: '/v1/account/unlock', 
        action: 'PUT',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 4,
        value: '/v1/account/forgot-password', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 5,
        value: '/v1/account/reset-password', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 6,
        value: '/v1/account/signout', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 7,
        value: '/v1/account/delete', 
        action: 'DELETE',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 8,
        value: '/v1/account/change-password', 
        action: 'PUT',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 9,
        value: '/v1/account/confirm-email', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 10,
        value: '/v1/account/confirm-change', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 11,
        value: '/v1/account/change-email', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 12,
        value: '/v1/account/update-profile', 
        action: 'PUT',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 13,
        value: '/v1/account/update-avatar', 
        action: 'PUT',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 14,
        value: '/v1/account/verify-email', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 15,
        value: '/v1/account/2fa', 
        action: 'GET',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 16,
        value: '/v1/account/2fa-verify', 
        action: 'POST',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      console.log('✅ Permission seeded');
    }
  }