package com.mainproject.subEntity.hospital;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hospitalId;

    @Column
    private String name;

    /*@Column
    private String phone;

    @Column
    private String address;*/

    @Column(nullable = false)
    @ColumnDefault("0")
    private double grade;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int reviewCount;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hospital", cascade = CascadeType.PERSIST)
    @JsonBackReference
    private List<Post> posts = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hospital", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<Member> members = new ArrayList<>();
}
