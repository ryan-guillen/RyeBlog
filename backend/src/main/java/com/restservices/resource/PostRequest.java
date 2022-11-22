package com.restservices.resource;

public class PostRequest {
    private String username;
    private String title;
    private String text;

    public PostRequest() {}

    public PostRequest(String username, String title, String text) {
        this.username = username;
        this.title = title;
        this.text = text;
    }

    public String getUsername() {
        return username;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setText(String text) {
        this.text = text;
    }
}
