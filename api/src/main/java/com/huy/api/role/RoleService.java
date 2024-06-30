package com.huy.api.role;

import java.util.List;

public interface RoleService {
    List<RoleDto> getAllRoles();

    RoleDto getRoleById(long id);

    RoleDto createRole(RoleDto roleDto);

    RoleDto updateRole(long id, RoleDto roleDto);

    void deleteRole(long id);
}
