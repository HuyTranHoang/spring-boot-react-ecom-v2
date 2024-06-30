package com.huy.api.role;

import jakarta.persistence.NoResultException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(roleMapper::toRoleDto)
                .toList();
    }

    @Override
    public RoleDto getRoleById(long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NoResultException("Role not found"));

        return roleMapper.toRoleDto(role);
    }

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        Role role = roleMapper.toRole(roleDto);
        roleRepository.save(role);

        return roleMapper.toRoleDto(role);
    }

    @Override
    public RoleDto updateRole(long id, RoleDto roleDto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NoResultException("Role not found"));

        roleMapper.updateRoleFromDto(roleDto, role);
        roleRepository.save(role);

        return roleMapper.toRoleDto(role);
    }

    @Override
    public void deleteRole(long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NoResultException("Role not found"));

        roleRepository.delete(role);
    }
}
