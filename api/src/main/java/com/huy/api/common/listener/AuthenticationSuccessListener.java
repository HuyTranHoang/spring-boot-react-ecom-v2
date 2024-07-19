package com.huy.api.common.listener;

import com.huy.api.common.cache.LoginAttemptService;
import com.huy.api.userPrincipal.UserPrincipal;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationSuccessListener {

    private final LoginAttemptService loginAttemptService;

    public AuthenticationSuccessListener(LoginAttemptService loginAttemptService) {
        this.loginAttemptService = loginAttemptService;
    }

    @EventListener
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        Object principal = event.getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal) {
            String username = ((UserPrincipal) principal).getUsername();
            loginAttemptService.evictUserFromLoginAttemptCache(username);
        }
    }
}
