package com.mainproject.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.auth.jwt.JwtTokenizer;
import com.mainproject.global.dto.LoginDto;
import com.mainproject.member.entity.Member;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    // 인증 시도 로직
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }

    // 클라이언트의 인증정보 이용 -> 인증 성공 할 경우
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {

        Member member = (Member) authResult.getPrincipal();

        // Access Token 생성
        String accessToken = jwtTokenizer.delegateAccessToken(member);
        // Refresh Token 생성
        String refreshToken = jwtTokenizer.delegateRefreshToken(member);

        // 응답 header에 Access Token 추가
        // 해당 토큰은 클라이언트 측에서 백엔드 측에 요청을 보낼때마다
        // request header에 추가해서 클라리언트 측의 자격 증명에 사용됨
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }
}