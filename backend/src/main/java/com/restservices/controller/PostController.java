package com.restservices.controller;

import com.restservices.model.Post;
import com.restservices.repository.PostRepository;
import com.restservices.resource.PostRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PostController {
    private PostRepository repo;

    public PostController(PostRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/post")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping("/post")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setText(postRequest.getText());
        post.setUsername(postRequest.getUsername());

        return ResponseEntity.status(201).body(repo.save(post));
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
}
