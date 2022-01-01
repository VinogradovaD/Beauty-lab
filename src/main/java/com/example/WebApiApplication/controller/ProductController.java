package com.example.WebApiApplication.controller;

import com.example.WebApiApplication.domain.Category;
import com.example.WebApiApplication.domain.Product;
import com.example.WebApiApplication.repo.ProductRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    private final ProductRepo productRepo;

    @Autowired
    public ProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @GetMapping
    public List<Product> list() {
        return productRepo.findAll();
    }

    @GetMapping("{category_id}")
    public List<Product> categoryList(@PathVariable("category_id") int category_id) {
        return productRepo.findAllByCategoryId(category_id);
    }

    @GetMapping("{category_id}/{id}")
    public Product getProduct(@PathVariable("id") Product product) {
        return product;
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return productRepo.save(product);
    }

    @PutMapping("{category_id}/{id}")
    public Product update(@PathVariable("id") Product productFromDb,
                          @RequestBody Product product) {
        BeanUtils.copyProperties(product, productFromDb, "id", "image", "category");
        return productRepo.save(productFromDb);
    }

    @DeleteMapping("{category_id}/{id}")
    public void delete(@PathVariable("id") Product product) {

        productRepo.delete(product);
    }
}
