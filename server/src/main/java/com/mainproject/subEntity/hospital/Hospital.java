package com.mainproject.subEntity.hospital;

import com.mainproject.post.entity.Post;
import com.mainproject.subEntity.medicalTag.MedicalTag;
import com.mainproject.subEntity.region.Region;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @Column(nullable = false)
    @ColumnDefault("0")
    private double grade;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int reviewCount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REGION_ID")
    private Region region;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hospital", cascade = CascadeType.PERSIST)
    private List<MedicalTag> medicalTags = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hospital", cascade = CascadeType.PERSIST)
    private List<Post> posts = new ArrayList<>();
}
