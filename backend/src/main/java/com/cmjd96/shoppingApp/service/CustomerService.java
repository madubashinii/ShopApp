package com.cmjd96.shoppingApp.service;

import com.cmjd96.shoppingApp.config.ResourceNotFoundException;
import com.cmjd96.shoppingApp.model.Customer;
import com.cmjd96.shoppingApp.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    public Customer addCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    public Customer getCustomerById(int pid) {
        return customerRepo.findById(pid).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
    }


    public List<Customer> getAllCustomer() {
        return customerRepo.findAll();
    }
}
