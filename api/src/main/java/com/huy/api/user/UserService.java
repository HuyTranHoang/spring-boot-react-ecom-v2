package com.huy.api.user;

import com.huy.api.common.exception.CustomRuntimeException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User addNewUser(User user, String[] role, MultipartFile profileImage) throws IOException;
    User updateUser(User user, String[] role, MultipartFile profileImage) throws IOException;
    void resetPassword(String email) throws CustomRuntimeException;
    void deleteUser(long id) throws CustomRuntimeException, IOException;
}