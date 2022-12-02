package com.restservices.controller;

import com.restservices.model.Account;
import com.restservices.repository.AccountRepository;
import com.restservices.resource.AccountRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity createAccount(@RequestBody AccountRequest accountRequest) {
        Optional<Account> account = repo.findById(accountRequest.getUsername());
        if (account.isPresent()) {
            return ResponseEntity.status(200).body("Failed");
        }
        Account newAccount = new Account();
        newAccount.setUsername(accountRequest.getUsername());
        newAccount.setBio(accountRequest.getBio());

        return ResponseEntity.status(201).body(repo.save(newAccount));
    }

    @GetMapping("/account/{id}")
    public ResponseEntity getAccountById(@PathVariable String id) {
        Optional<Account> account = repo.findById(id);
        if (account.isPresent()) { // if account exists
            return ResponseEntity.ok(account.get());
        }
        else {
            return ResponseEntity.ok("Account not found.");
        }
    }

}
