package com.huy.api.user;

import com.huy.api.role.Role;
import com.huy.api.role.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserDto)
                .toList();
    }

    @Override
    public UserDto getUserById(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toUserDto(user);
    }

    @Override
    public UserDto createUser(UserDto userDto) throws IOException {
        User user = userMapper.toUser(userDto);

        user.setActive(userDto.getStringIsActive().equals("true"));
        user.setLocked(userDto.getStringIsLocked().equals("true"));

        List<Role> roles = getRoleList(userDto.getRoles());
        user.setRoles(roles);

        MultipartFile image = userDto.getImage();

        if (image != null) {
            String avatarUrl = addImage(image);
            user.setAvatar(avatarUrl);
        } else {
            user.setAvatar("default.png");
        }

        userRepository.save(user);
        return userMapper.toUserDto(user);
    }

    @Override
    public UserDto updateUser(long id, UserDto userDto) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateFromDto(userDto, user);

        user.setActive(userDto.getStringIsActive().equals("true"));
        user.setLocked(userDto.getStringIsLocked().equals("true"));

        List<Role> roles = getRoleList(userDto.getRoles());
        user.setRoles(roles);

        if (userDto.getImage() != null) {
            deleteImage(user.getAvatar());
            String avatarUrl = addImage(userDto.getImage());
            user.setAvatar(avatarUrl);
        }

        userRepository.save(user);
        return userMapper.toUserDto(user);
    }

    @Override
    public void deleteUser(long id) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getRoles().clear();

        deleteImage(user.getAvatar());

        userRepository.delete(user);
    }

    /*
        Helper method
    */
    private List<Role> getRoleList(String roles) {
        List<Long> roleIds;
        try {
            roleIds = Stream.of(roles.split(","))
                    .map(String::trim)
                    .map(Long::parseLong)
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Roles are invalid");
        }

        if (roleIds.isEmpty()) {
            throw new RuntimeException("Roles are required");
        }

        return roleRepository.findAllById(roleIds);
    }

    private String addImage(MultipartFile image) throws IOException {
        String imageFileExtension = image.getContentType();

        List<String> allowedExtensions = Arrays.asList(MimeTypeUtils.IMAGE_JPEG_VALUE, MimeTypeUtils.IMAGE_PNG_VALUE);
        if (!allowedExtensions.contains(imageFileExtension)) {
            throw new RuntimeException("Only PNG and JPEG images are allowed");
        }

        Path fileFolder = Path.of("upload/images/profile");

        if (!Files.exists(fileFolder)) {
            Files.createDirectories(fileFolder);
        }

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path filePath = fileFolder.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);

        return fileName;
    }

    private void deleteImage(String fileName) throws IOException {
        if (fileName.equals("default.png")) {
            return;
        }

        Path path = Path.of("upload/images/profile/" + fileName);
        Files.deleteIfExists(path);
    }
}
