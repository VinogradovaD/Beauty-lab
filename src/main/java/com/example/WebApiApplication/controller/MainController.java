package com.example.WebApiApplication.controller;

import com.example.WebApiApplication.domain.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/catalog")
    public String main() {
        return "catalog";
    }

    @GetMapping("/profile")
    public String userPage(@AuthenticationPrincipal User user) {
        System.out.println(user);
        if (user.getRoles().toString().equals("[ADMIN]")) {
            return "admin_page";
        }
        return "user_page";
    }

    @GetMapping("/create_product")
    public String create() {
        return "create_product";
    }
    @GetMapping("/sign_up")
    public String signUpPage() {
        return "sign_up";
    }

    @GetMapping("/update_product")
    public String updateProductPage() {
        return "update_product";
    }
}
