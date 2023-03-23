package com.mainproject.auth;

import com.mainproject.auth.jwt.JwtTokenizer;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @PostMapping("/refresh")
    public ResponseEntity refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("Refresh");

        // 쿠키 적용 시에 사용
        /*String refreshToken = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("Refresh"))
                .map(Cookie::getValue)
                .collect(Collectors.joining(""));*/

        String email = jwtTokenizer.getSubject(refreshToken);

        Member obtainedMember = memberService.findMemberByEmail(email);

        /*if (redisTemplate.opsForValue().get("RefreshToken:" + obtainedMember.getEmail()) == null) {
            return new ResponseEntity<>(ErrorResponse.of(HttpStatus.BAD_REQUEST,
                    "The refresh token is invalid."), HttpStatus.BAD_REQUEST);
        }*/

        String newAccessToken = jwtTokenizer.delegateAccessToken(obtainedMember);

        // 쿠키 적용 시에 사용
        /*Cookie cookie = new Cookie("Authorization", "Bearer " + newAccessToken);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setMaxAge(1200);
        response.addCookie(cookie);*/

        response.addHeader("Authorization", "Bearer " + newAccessToken);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/access")
    public ResponseEntity verifiedAccessToken(@AuthenticationPrincipal String email) {

        memberService.findMemberByEmail(email);

        return ResponseEntity.ok().body("Access token validation successful!");
    }
}

