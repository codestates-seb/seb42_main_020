package com.mainproject.post.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.post.dto.PostPatchDto;
import com.mainproject.post.dto.PostPostDto;
import com.mainproject.post.dto.PostResponseDto;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    // 페이징 조회

    // 단일 조회
    public PostResponseDto getPost(Long id){
        Post getPost = postRepository.findById(id).get();

        PostResponseDto dto = new PostResponseDto();

        dto.setPostId(getPost.getPostId());
        dto.setTitle(getPost.getTitle());
        dto.setContent(getPost.getContent());
        dto.setCreatedAt(getPost.getCreatedAt());
        dto.setModifiedAt(getPost.getModifiedAt());

//        dto.setMemberComments(getPost.getMemberComments().stream()
//                .map(member comment의 response dto :: createdByEntity)
//                .collect(Collectors.toList()));
//
//        dto.setDoctorComments(getPost.setDoctorComments().stream()
//                .map(doctor comment의 response dto :: createdByEntity)
//                .collect(Collectors.toList()));

        return dto;
    }


    //생성
    public Long createPost(PostPostDto dto){
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
//        post.setTagId(dto.getTagId());
//        post.setRegionId(dto.getRegionId());

        return postRepository.save(post).getPostId();
    }

    // 수정
    public void updatePost(PostPatchDto dto, Long id){
        Optional<Post> optionalPost = postRepository.findById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setTitle(dto.getTitle());
            post.setContent(dto.getContent());
//            post.setTagId(dto.getTagId());
//            post.setRegionId(dto.getRegionId());
            postRepository.save(post);
        } else {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }
    }

    // 삭제 -> 상태 바꾸기로 수정해야됨
    public void deletePost(Long id){
        postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        postRepository.deleteById((id));
    }

}
