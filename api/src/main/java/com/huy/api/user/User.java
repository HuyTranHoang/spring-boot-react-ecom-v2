package com.huy.api.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.huy.api.role.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    private String username;

    private String email;

    private String password;

    private String avatar = "default.jpg";

    @Column(name ="is_active")
    @JsonProperty("isActive")
    private boolean isActive;

    @Column(name = "is_locked")
    @JsonProperty("isLocked")
    private boolean isLocked;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;
}
