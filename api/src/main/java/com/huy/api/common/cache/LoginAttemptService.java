package com.huy.api.common.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class LoginAttemptService {
    private static final int MAX_ATTEMPT = 5;
    private static final int ATTEMPT_INCREMENT = 1;

    private final LoadingCache<String, Integer> attemptsCache;

    public LoginAttemptService() {
        this.attemptsCache = CacheBuilder.newBuilder()
                .expireAfterWrite(15, TimeUnit.MINUTES)
                .maximumSize(100)
                .build(
                        new CacheLoader<String, Integer>() {
                            @Override
                            public Integer load(String key) {
                                return 0;
                            }
                        }
                );
    }

    public void loginFailed(String key) {
        int attempts = 0;
        try {
            attempts = attemptsCache.get(key);
        } catch (Exception e) {
            attempts = 0;
        }
        attempts += ATTEMPT_INCREMENT;
        attemptsCache.put(key, attempts);
    }

    public void evictUserFromLoginAttemptCache(String key) {
        attemptsCache.invalidate(key);
    }

    public boolean hasExceededMaxAttempts(String key) {
        try {
            return attemptsCache.get(key) >= MAX_ATTEMPT;
        } catch (Exception e) {
            return false;
        }
    }
}
