package com.restservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("accounts")
public class Account {
    @Id private String username;
    private String bio;

    public Account() {}

    public Account(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
    public String getBio() {
        return bio;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
