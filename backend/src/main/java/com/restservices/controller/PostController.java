package com.restservices.controller;

import com.restservices.model.Account;
import com.restservices.model.Post;
import com.restservices.repository.AccountRepository;
import com.restservices.repository.PostRepository;
import com.restservices.resource.PostRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PostController {
    private PostRepository repo;
    private AccountRepository accountRepo;

    public PostController(PostRepository repo, AccountRepository accountRepo) {
        this.repo = repo;
        this.accountRepo = accountRepo;
    }

    @GetMapping("/post")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping("/post")
    public ResponseEntity createPost(@RequestBody PostRequest postRequest) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setText(postRequest.getText());
        post.setUsername(postRequest.getUsername());
        Optional<Account> acc = accountRepo.findById(postRequest.getUsername());
        if (!acc.isPresent()) {
            System.out.println("failure");
            return ResponseEntity.status(200).body("Failure: No account by that username");
        }
        System.out.println("success");
        repo.save(post);
        return ResponseEntity.status(201).body("Success!");
    }

    @GetMapping("/post/{id}")
    public ResponseEntity getPostById(@PathVariable String id) {
        Optional<Post> post = repo.findById(id);
        if (post.isPresent()) {
            return ResponseEntity.ok(post.get());
        }
        else {
            return ResponseEntity.ok("Post not found.");
        }
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity deletePostById(@PathVariable String id) {
        Optional<Post> post = repo.findById(id);
        if (post.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok("Success");
        }
        else {
            return ResponseEntity.ok("Post not found.");
        }
    }

    @GetMapping("/post/account/{username}")
    public ResponseEntity<List<Post>> getPostsByAccount(@PathVariable String username) {
        List<Post> posts = repo.findByUsername(username);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/post/edit")
    public ResponseEntity updatePost(@RequestBody Post updatedPost) {
        Optional<Post> post = repo.findById(updatedPost.getId());
        if (post.isPresent()) {
            repo.save(updatedPost);
            return ResponseEntity.status(201).body("Success");
        }
        else {
            return ResponseEntity.status(200).body("Post not found.");
        }
    }
}
