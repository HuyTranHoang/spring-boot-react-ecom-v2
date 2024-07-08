package com.huy.api.user;

import java.io.IOException;
import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers();

    UserDto getUserById(long id);

    UserDto createUser(UserDto userDto) throws IOException;

    UserDto updateUser(long id, UserDto userDto) throws IOException;

    UserDto resetPassword(String email) throws IOException;

    void deleteUser(long id) throws IOException;
}
