package com.mainproject.subEntity;

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
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hospitalId;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REGION_ID")
    private Region region;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hospital", cascade = CascadeType.PERSIST)
    private List<MedicalTag> medicalTags = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hospital", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();
}
