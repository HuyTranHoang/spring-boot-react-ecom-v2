package com.huy.api.role;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<RoleDto>> getRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @PostMapping({"", "/"})
    public ResponseEntity<RoleDto> createRole(@RequestBody @Valid RoleDto roleDto) {
        return ResponseEntity.ok(roleService.createRole(roleDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable long id, @RequestBody @Valid RoleDto roleDto) {
        return ResponseEntity.ok(roleService.updateRole(id, roleDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable long id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
