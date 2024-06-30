package com.huy.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.huy.api.common.validation.UniqueEmail;
import com.huy.api.common.validation.UniqueUsername;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@UniqueEmail
@UniqueUsername
public class UserDto {

    private long id;

    @NotEmpty(message = "Last name is required")
    private String lastName;

    @NotEmpty(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Username is required")
    private String username;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    @NotEmpty(message = "Password is required")
    private String password;

    private String avatar = "default.png";

    @JsonProperty("isActive")
    private boolean isActive;

    @JsonProperty("isLocked")
    private boolean isLocked;

    @NotEmpty(message = "Roles are required")
    private String roles;

    @Transient
    @JsonIgnore
    @NotEmpty(message = "Active status are required")
    private String stringIsActive;

    @Transient
    @JsonIgnore
    @NotEmpty(message = "Locked status are required")
    private String stringIsLocked;

    @Transient
    @JsonIgnore
    private MultipartFile image;
}
