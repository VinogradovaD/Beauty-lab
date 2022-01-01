package com.example.WebApiApplication.repo;

import com.example.WebApiApplication.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findAllByCategoryId(int category_id);
}
