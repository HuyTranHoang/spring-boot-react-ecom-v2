package com.huy.api.buggy;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buggy")
public class BuggyController {

    @PostMapping("validate-error")
    public ResponseEntity<Buggy> validateError(@Valid @RequestBody Buggy buggy) {
        System.out.println(buggy);
        return ResponseEntity.ok(buggy);
    }
}
