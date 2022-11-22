package com.restservices.resource;

public class AccountRequest {

    private String username;
    private String bio;

    public AccountRequest() {}

    public AccountRequest(String username, String bio) {
        this.username = username;
        this.bio = bio;
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
