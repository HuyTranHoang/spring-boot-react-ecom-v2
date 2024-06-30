package com.huy.api.role;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleDto toRoleDto(Role role);

    Role toRole(RoleDto roleDTO);

    @Mapping(target = "id", ignore = true)
    void updateRoleFromDto(RoleDto roleDTO, @MappingTarget Role role);
}
