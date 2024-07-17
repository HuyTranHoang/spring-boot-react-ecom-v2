package com.huy.api.user;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.huy.api.common.HttpResponse;
import com.huy.api.common.PageInfo;
import com.huy.api.common.constant.FileConstant;
import com.huy.api.common.exception.CustomRuntimeException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository, UserRepository userRepository1) {
        this.userService = userService;
        this.userRepository = userRepository1;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) throws CustomRuntimeException {
        validateNewUsernameAndEmail(StringUtils.EMPTY, user.getUsername(), user.getEmail());
        User newUser = userService.register(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addNewUser(@RequestParam("firstName") String firstName,
                                           @RequestParam("lastName") String lastName,
                                           @RequestParam("username") String username,
                                           @RequestParam("email") String email,
                                           @RequestParam("role") List<String> role,
                                           @RequestParam("isActive") String isActive,
                                           @RequestParam("isNonLocked") String isNonLocked,
                                           @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws CustomRuntimeException, IOException {
        validateNewUsernameAndEmail(StringUtils.EMPTY, username, email);

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setEmail(email);
        user.setActive(Boolean.parseBoolean(isActive));
        user.setNotLocked(Boolean.parseBoolean(isNonLocked));
        User newUser = userService.addNewUser(user, role.toArray(new String[0]), profileImage);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(@RequestParam("currentUsername") String currentUsername,
                                           @RequestParam("firstName") String firstName,
                                           @RequestParam("lastName") String lastName,
                                           @RequestParam("username") String username,
                                           @RequestParam("email") String email,
                                           @RequestParam("role") List<String> role,
                                           @RequestParam("isActive") String isActive,
                                           @RequestParam("isNonLocked") String isNonLocked,
                                           @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws CustomRuntimeException, IOException {
        User currentUser = validateNewUsernameAndEmail(currentUsername, username, email);

        currentUser.setFirstName(firstName);
        currentUser.setLastName(lastName);
        currentUser.setUsername(username);
        currentUser.setEmail(email);
        currentUser.setActive(Boolean.parseBoolean(isActive));
        currentUser.setNotLocked(Boolean.parseBoolean(isNonLocked));
        User updatedUser = userService.updateUser(currentUser, role.toArray(new String[0]), profileImage);
        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping(path = "/image/profile/{username}", produces = IMAGE_JPEG_VALUE)
    public byte[] getTempProfileImage(@PathVariable("username") String username) throws IOException {
        URL url = new URL("https://robohash.org/" + username);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (InputStream inputStream = url.openStream()) {
            byte[] chunk = new byte[1024];

            int bytesRead;
            while ((bytesRead = inputStream.read(chunk)) > 0) {
                byteArrayOutputStream.write(chunk, 0, bytesRead);
            }
        }
        return byteArrayOutputStream.toByteArray();
    }

    @GetMapping(path = "/image/{username}/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getProfileImage(@PathVariable("username") String username, @PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(FileConstant.USER_FOLDER + username + File.separator + fileName));
    }

    private User validateNewUsernameAndEmail(String currentUsername, String newUsername, String newEmail) throws CustomRuntimeException {
        User newUserByUsername = userRepository.findUserByUsername(newUsername);
        User newUserByEmail = userRepository.findUserByEmail(newEmail);

        if (StringUtils.isNotBlank(currentUsername)) {
            /// update
            User currentUser = userRepository.findUserByUsername(currentUsername);
            if (currentUser == null) {
                throw new CustomRuntimeException("No user found by username " + currentUsername);
            }

            if (newUserByUsername != null && !(currentUser.getId() == newUserByUsername.getId())) {
                throw new CustomRuntimeException(("Username already exists"));
            }

            if (newUserByEmail != null && !(currentUser.getId() == newUserByEmail.getId())) {
                throw new CustomRuntimeException(("Email has been registered for other user"));
            }
            return currentUser;
        } else {
            /// create
            if (newUserByUsername != null) {
                throw new CustomRuntimeException(("Username already exists"));
            }

            if (newUserByEmail != null) {
                throw new CustomRuntimeException(("Email has been registered for other user"));
            }
            return null;
        }
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "3") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAll(pageable);

        PageInfo myPage = new PageInfo(
                users.getNumber(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.getSize());

        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        response.put("page", myPage);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/resetpassword/{email}")
    public ResponseEntity<HttpResponse> resetPassword(@PathVariable("email") String email) throws CustomRuntimeException {
        userService.resetPassword(email);
        return new ResponseEntity<>(
                new HttpResponse(
                        HttpStatus.OK.value(),
                        HttpStatus.OK,
                        HttpStatus.OK.getReasonPhrase(),
                        "The reset password has been sent to email " + email),
                HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('user:delete')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpResponse> deleteUser(@PathVariable("id") Long id) throws CustomRuntimeException, IOException {
        userService.deleteUser(id);
        return new ResponseEntity<>(
                new HttpResponse(
                        HttpStatus.NO_CONTENT.value(),
                        HttpStatus.NO_CONTENT,
                        HttpStatus.NO_CONTENT.getReasonPhrase(),
                        "User has been deleted successfully"),
                HttpStatus.NO_CONTENT);
    }

    @PostMapping("/updateProfileImage")
    public ResponseEntity<User> updateProfileImage(@RequestParam(value = "profileImage") MultipartFile profileImage) throws CustomRuntimeException, IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByUsername(username);
        User updatedUser = userService.updateProfileImage(user, profileImage);
        return ResponseEntity.ok(updatedUser);
    }
}