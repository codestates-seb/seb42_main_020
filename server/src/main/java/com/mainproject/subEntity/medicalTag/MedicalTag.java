package com.mainproject.subEntity.medicalTag;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mainproject.post.entity.Post;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MedicalTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long medicalTagId;

    @Column(nullable = false)
    private String title;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "medicalTag", cascade = CascadeType.PERSIST)
    @JsonBackReference
    private List<Post> posts = new ArrayList<>();
}
