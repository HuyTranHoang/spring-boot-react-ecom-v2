package com.huy.api.user;

import com.huy.api.common.constant.FileConstant;
import com.huy.api.common.email.EmailSenderService;
import com.huy.api.common.exception.CustomRuntimeException;
import com.huy.api.role.RoleRepository;
import com.huy.api.userPrincipal.UserPrincipal;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Date;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {
    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EmailSenderService emailSenderService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, EmailSenderService emailSenderService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.emailSenderService = emailSenderService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User addNewUser(User user, String[] role, MultipartFile profileImage) throws IOException {
        String password = RandomStringUtils.randomAlphabetic(10);
        String encodedPassword = passwordEncoder.encode(password);

        user.setUserId(RandomStringUtils.randomNumeric(10));
        user.setJoinDate(new Date());
        user.setPassword(encodedPassword);

        user.setRoles(Arrays.stream(role)
                .map(roleRepository::findRoleByName)
                .toList()
        );

        user.setAuthorities(Arrays.stream(role)
                .map(roleRepository::findRoleByName)
                .flatMap(ro -> ro.getAuthorities().stream())
                .distinct()
                .toList()
        );

        user.setProfileImageUrl(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(FileConstant.DEFAULT_USER_IMAGE_PATH + user.getUsername()).toUriString());

        userRepository.save(user);
        saveProfileImage(user, profileImage);

        LOGGER.info("Random password: {}", password);
        return user;
    }

    private void saveProfileImage(User user, MultipartFile profileImage) throws IOException {
        if (profileImage != null) {
            Path userFolder = Paths.get(FileConstant.USER_FOLDER + user.getUsername()).toAbsolutePath().normalize();

            if (!Files.exists(userFolder)) {
                Files.createDirectories(userFolder);
            }

            Files.deleteIfExists(Paths.get(userFolder + user.getUsername() + ".jpg"));

            Files.copy(profileImage.getInputStream(), userFolder.resolve(user.getUsername() + ".jpg"), REPLACE_EXISTING);

            user.setProfileImageUrl(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(FileConstant.USER_IMAGE_PATH + user.getUsername() + File.separator
                            + user.getUsername() + ".jpg").toUriString());
            userRepository.save(user);
            LOGGER.info("Save file in file system by name: {}", profileImage.getOriginalFilename());
        }
    }

    @Override
    public User updateUser(User user, String[] role, MultipartFile profileImage) throws IOException {
        user.setRoles(Arrays.stream(role).map(roleRepository::findRoleByName)
                .toList()
        );
        user.setAuthorities(Arrays.stream(role).map(roleRepository::findRoleByName)
                .flatMap(ro -> ro.getAuthorities().stream())
                .toList()
        );
        userRepository.save(user);
        saveProfileImage(user, profileImage);
        return user;
    }

    @Override
    public void resetPassword(String email) throws CustomRuntimeException {
        User user = userRepository.findUserByEmail(email);

        if (user == null)
            throw new CustomRuntimeException("No user found for the email: " + email);

        String password = RandomStringUtils.randomAlphabetic(10);
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        userRepository.save(user);
        LOGGER.info("Reset password: {}", password);
        emailSenderService.sendEmail(user.getEmail(),
                "Your new password",
                "Hello " + user.getFirstName() + "\n\nYour new password is " + password + "\n\nThe Support Team");
    }

    @Override
    public void deleteUser(long id) throws CustomRuntimeException, IOException {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new CustomRuntimeException("User not found");
        }
        Path userFolder = Paths.get(FileConstant.USER_FOLDER + user.getUsername()).toAbsolutePath().normalize();
        FileUtils.deleteDirectory(new File(userFolder.toString()));
        userRepository.deleteById(id);
    }

    @Override
    public User register(User user) {
        String password = RandomStringUtils.randomAlphabetic(10);
        String encodedPassword = passwordEncoder.encode(password);

        user.setUserId(RandomStringUtils.randomNumeric(10));
        user.setActive(true);
        user.setNotLocked(true);
        user.setJoinDate(new Date());
        user.setPassword(encodedPassword);

        user.setRoles(Arrays.stream(new String[]{"ROLE_USER"})
                .map(roleRepository::findRoleByName)
                .toList()
        );

        user.setAuthorities(Arrays.stream(new String[]{"ROLE_USER"})
                .map(roleRepository::findRoleByName)
                .flatMap(ro -> ro.getAuthorities().stream())
                .distinct()
                .toList()
        );

        user.setProfileImageUrl(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(FileConstant.DEFAULT_USER_IMAGE_PATH + user.getUsername()).toUriString());

        userRepository.save(user);

        LOGGER.info("Random password: {}", password);
        return user;
    }

    @Override
    public User updateProfileImage(User user, MultipartFile profileImage) throws CustomRuntimeException, IOException {
        saveProfileImage(user, profileImage);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);

        if (user == null) {
            LOGGER.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        }

        user.setLastLoginDateDisplay(user.getLastLoginDate());
        user.setLastLoginDate(new Date());
        userRepository.save(user);

        return new UserPrincipal(user);

//        return new org.springframework.security.core.userdetails.User(user.getUsername(),
//                user.getPassword(),
//                user.getAuthorities()
//        );

    }
}