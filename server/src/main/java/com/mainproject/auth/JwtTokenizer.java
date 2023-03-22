package com.mainproject.auth;

import com.google.gson.Gson;
import com.mainproject.global.response.ErrorResponse;
import com.mainproject.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenizer {

    @Getter
    @Value("${jwt.secret}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    // Access 토큰 만료시간
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    // Refresh 토큰 만료시간
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String getSubject(String jws) {
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        String subject = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody()
                .getSubject();
        return subject;
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public void verifySignature(String jws, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }


    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();
        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {

        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);

        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    // Access Token, Refresh Token 생성 로직
    public String delegateAccessToken(Member member) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();

        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        String accessToken = generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(Member member) {

        String subject = member.getEmail();
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        String refreshToken = generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException {

        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.NOT_FOUND);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}