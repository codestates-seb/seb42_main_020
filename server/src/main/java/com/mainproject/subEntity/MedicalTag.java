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
public class MedicalTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long medicalTagId;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HOSPITAL_ID")
    private Hospital hospital;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "medicalTag", cascade = CascadeType.PERSIST)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "medicalTag", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();
}
