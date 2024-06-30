package com.huy.api.common.email;

public interface EmailSenderService {
    void sendEmail(String to, String subject, String text);
}
