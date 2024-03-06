package com.example.rk2javaee.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/Registration")
    public String secondPage() {
        return "register";
    }
    @GetMapping("/Login")
    public String thirdPage() {
        return "login";
    }
    @GetMapping("/Notebook")
    public String firstPage() {
        return "index";
    }
}
