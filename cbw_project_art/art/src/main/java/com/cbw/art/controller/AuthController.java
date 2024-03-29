package com.cbw.art.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.LoginDto;
import com.cbw.art.dto.TokenDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.jwt.JwtFilter;
import com.cbw.art.jwt.TokenProvider;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(TokenProvider tokenProvider, 
    		AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    //로그인
    @PostMapping("/authenticate")
    public ResponseEntity<BaseResponse<TokenDto>> authorize(@RequestBody @Valid LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), 
                		loginDto.getPassword());


        Authentication authentication = authenticationManagerBuilder.getObject()
        		.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(
                new BaseResponse<>(ResultCode.SUCCESS.name(), 
                new TokenDto(jwt), 
                ResultCode.SUCCESS.getMsg()),
                httpHeaders,
                HttpStatus.OK);
    }
}