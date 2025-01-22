package com.cmjd96.shoppingApp.controller;

import com.cmjd96.shoppingApp.model.Customer;
import com.cmjd96.shoppingApp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
@CrossOrigin(origins="http://localhost:4200")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        return new ResponseEntity<Customer>(customerService.addCustomer(customer), HttpStatus.CREATED);
    }

    @RequestMapping("get/{id}")
    public Customer getCustomerById(@PathVariable int id) {
        return customerService.getCustomerById(id);
    }


    @RequestMapping("/getAll")
    public List<Customer> getAllCustomer() {
        return customerService.getAllCustomer();
    }


}
