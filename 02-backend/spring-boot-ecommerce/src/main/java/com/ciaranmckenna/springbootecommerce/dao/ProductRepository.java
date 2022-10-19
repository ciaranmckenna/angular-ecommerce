package com.ciaranmckenna.springbootecommerce.dao;

import com.ciaranmckenna.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

  // Adding findByCategoryId to retrieve products by category id
  Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

  // find product by product name
  Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);


}
