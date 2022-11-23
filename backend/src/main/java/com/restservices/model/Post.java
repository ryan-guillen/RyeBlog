package com.restservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("posts")
public class Post {
    @Id private String id;

    private String username;
    private String title;
    private String text;

    public Post() {}

    public Post(String username, String title, String text) {
        this.username = username;
        this.title = title;
        this.text = text;
    }

    public String getId() {
        return id;
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
