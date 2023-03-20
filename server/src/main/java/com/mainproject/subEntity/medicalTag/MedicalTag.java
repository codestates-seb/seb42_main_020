package com.mainproject.subEntity.medicalTag;

import com.mainproject.post.entity.Post;
import com.mainproject.subEntity.hospital.Hospital;
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "medicalTag", cascade = CascadeType.PERSIST)
    private List<Post> posts = new ArrayList<>();
}
