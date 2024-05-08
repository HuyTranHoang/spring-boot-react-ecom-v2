package com.huy.api.product;

import com.huy.api.product.dto.ProductDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products/")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable long id) {
        ProductDto productDto = productService.findById(id);

        if (productDto == null) {
            throw new RuntimeException("Product not found");
        }

        return ResponseEntity.ok(productDto);
    }

    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody ProductDto productDto) {
        Product savedProduct = productService.save(productDto);
        URI uri = URI.create("/api/products/" + savedProduct.getId());
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody ProductDto productDto) {
        return ResponseEntity.ok(productService.update(id, productDto));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
