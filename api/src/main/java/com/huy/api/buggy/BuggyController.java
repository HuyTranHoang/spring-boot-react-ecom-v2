package com.huy.api.buggy;

import com.huy.api.common.HttpResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buggy")
public class BuggyController {

    @PostMapping("validate-error")
    public ResponseEntity<Buggy> validateError(@Valid @RequestBody Buggy buggy) {
        System.out.println(buggy);
        return ResponseEntity.ok(buggy);
    }

    @GetMapping("/500")
    public ResponseEntity<HttpResponse> internalServerError() {
        Buggy buggy = null;
        buggy.getName();
        return null;
    }
}
