package com.huy.api.file;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/file")
public class FileController {

    @GetMapping(value = "/image/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        try {
            Path path = Path.of("upload/images/" + fileName);
            Resource resource = new UrlResource(path.toUri());
            byte[] data = resource.getInputStream().readAllBytes();

            if (data.length == 0) {
                throw new RuntimeException("File not found");
            }

            return ResponseEntity.ok().body(data);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping(value = "/avatar/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> getAvatar(@PathVariable String fileName) {
        try {
            Path path = Path.of("upload/images/profile/" + fileName);
            Resource resource = new UrlResource(path.toUri());
            byte[] data = resource.getInputStream().readAllBytes();

            if (data.length == 0) {
                throw new RuntimeException("File not found");
            }

            return ResponseEntity.ok().body(data);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
