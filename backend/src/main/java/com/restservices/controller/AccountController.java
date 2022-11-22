package com.restservices.controller;

import com.restservices.model.Account;
import com.restservices.repository.AccountRepository;
import com.restservices.resource.AccountRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AccountController {
    private AccountRepository repo;

    public AccountController (AccountRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/account")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping("/account")
    public ResponseEntity<Account> createAccount(@RequestBody AccountRequest accountRequest) {
        Account account = new Account();
        account.setUsername(accountRequest.getUsername());
        account.setBio(accountRequest.getBio());

        return ResponseEntity.status(201).body(repo.save(account));
    }

    @GetMapping("/account/{id}")
    public ResponseEntity getAccountById(@PathVariable String id) {
        Optional<Account> account = repo.findById(id);
        if(account.isPresent()) { // if account exists
            return ResponseEntity.ok(account.get());
        }
        else {
            return ResponseEntity.ok("Account not found.");
        }
    }

}
