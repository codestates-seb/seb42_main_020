package com.mainproject.subEntity;

import com.mainproject.post.entity.Post;
import com.mainproject.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long regionId;

    @Column(nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "region", cascade = CascadeType.PERSIST)
    private Hospital hospital;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "region", cascade = CascadeType.PERSIST)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "region", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();
}
