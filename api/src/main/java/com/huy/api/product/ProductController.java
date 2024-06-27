package com.huy.api.product;

import com.huy.api.product.dto.ProductDto;
import com.huy.api.product.dto.ProductParams;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping({"", "/"})
    public ResponseEntity<List<ProductDto>> getProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable long id) {
        ProductDto productDto = productService.findById(id);

        if (productDto == null) {
            throw new RuntimeException("Product not found");
        }

        return ResponseEntity.ok(productDto);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<Product> saveProduct(@ModelAttribute ProductDto productDto) throws IOException {
        MultipartFile image = productDto.getImage();

        if (image != null) {
            String imageFileExtension = image.getContentType();

            List<String> allowedExtensions = Arrays.asList(MimeTypeUtils.IMAGE_JPEG_VALUE, MimeTypeUtils.IMAGE_PNG_VALUE);
            if (!allowedExtensions.contains(imageFileExtension)) {
                throw new RuntimeException("Only PNG and JPEG images are allowed");
            }

            Path fileFolder = Path.of("upload/images");

            if (!Files.exists(fileFolder)) {
                Files.createDirectories(fileFolder);
            }

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = fileFolder.resolve(fileName);
            Files.copy(image.getInputStream(), filePath);
            productDto.setImageUrl(fileName);
        } else {
            System.out.println("File is null");
        }

        Product savedProduct = productService.save(productDto);
        URI uri = URI.create("/api/products/" + savedProduct.getId());
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody ProductDto productDto) {
        return ResponseEntity.ok(productService.update(id, productDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProducts(@ModelAttribute ProductParams productParams) {
        return ResponseEntity.ok(productService.search(productParams));
    }
}
