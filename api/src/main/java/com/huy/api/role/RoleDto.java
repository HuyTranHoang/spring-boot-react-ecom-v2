package com.huy.api.role;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDto {

    private long id;

    @NotEmpty(message = "Role name is required")
    private String name;
}
