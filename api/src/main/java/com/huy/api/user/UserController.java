package com.huy.api.user;

import com.huy.api.common.email.EmailSenderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final EmailSenderService emailSenderService;

    public UserController(UserService userService, EmailSenderService emailSenderService) {
        this.userService = userService;
        this.emailSenderService = emailSenderService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping({"", "/"})
    public ResponseEntity<UserDto> createUser(@ModelAttribute @Valid UserDto userDto) throws IOException {
        UserDto user = userService.createUser(userDto);

        if (user != null) {
            String template = """
                    Welcome to our website
                    Here is your account information:
                    Username: %s
                    Password: %s
                    Email: %s
                    """;

            String context = String.format(template, user.getUsername(), user.getPassword(), user.getEmail());
            emailSenderService.sendEmail(user.getEmail(), "Welcome to our website", context);
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable long id, @ModelAttribute @Valid UserDto userDto) throws IOException {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) throws IOException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
