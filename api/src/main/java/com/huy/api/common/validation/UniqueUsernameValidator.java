//package com.huy.api.common.validation;
//
//import com.huy.api.user.User;
//import com.huy.api.user.UserDto;
//import com.huy.api.user.UserRepository;
//import jakarta.validation.ConstraintValidator;
//import jakarta.validation.ConstraintValidatorContext;
//import org.springframework.stereotype.Component;
//
//@Component
//public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, UserDto> {
//    private final UserRepository userRepository;
//
//    public UniqueUsernameValidator(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public boolean isValid(UserDto userDto, ConstraintValidatorContext context) {
//        boolean isValid = true;
//
//        User existingUser = userRepository.findByUsername(userDto.getUsername());
//        if (existingUser != null) {
//            isValid = existingUser.getId() == userDto.getId();
//
//            if (!isValid) {
//                context.disableDefaultConstraintViolation();
//                context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
//                        .addPropertyNode("username")
//                        .addConstraintViolation();
//            }
//        }
//
//        return isValid;
//    }
//}
//
