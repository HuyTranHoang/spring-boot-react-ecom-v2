package com.huy.api.authentication;

import com.huy.api.basket.BasketDto;
import com.huy.api.basket.BasketService;
import com.huy.api.common.constant.SecurityConstant;
import com.huy.api.common.utility.JWTTokenProvider;
import com.huy.api.user.User;
import com.huy.api.user.UserRepository;
import com.huy.api.userPrincipal.UserPrincipal;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {
    private final UserRepository userRepository;
    private final JWTTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final BasketService basketService;

    public LoginController(UserRepository userRepository, JWTTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager, BasketService basketService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.basketService = basketService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user,
                                                     @CookieValue(name = "buyerId", defaultValue = "") String buyerId,
                                                     HttpServletResponse response) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        User loginUser = userRepository.findUserByUsername(user.getUsername());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);

        BasketDto basketDto = basketService.getBasket(buyerId, userPrincipal.getUsername(), response);

        Map<String, Object> responseBody = Map.of(
                "user", loginUser,
                "basket", basketDto
        );

        jwtTokenProvider.generateJwtToken(userPrincipal);
        HttpHeaders jwtHeader = new HttpHeaders();
        jwtHeader.add(SecurityConstant.JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userPrincipal));

        return ResponseEntity.ok()
                .headers(jwtHeader)
                .body(responseBody);
    }
}
