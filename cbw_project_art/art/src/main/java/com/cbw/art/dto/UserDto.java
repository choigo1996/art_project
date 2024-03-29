package com.cbw.art.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.stream.Collectors;

import com.cbw.art.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserDto {
	private long id;
	@NotNull
	@NotBlank
	@Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
	@Size(min = 3, max = 50)
	private String loginId;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotNull
	@NotBlank
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{8,20}$",
			message = "영문 숫자 특수문자를 포함한 8~20자리로 입력해주세요")
	private String password;
	
	@NotNull
	@NotBlank
	@Size(min = 2, max = 20)
	private String name;
	
	@NotNull
	@NotBlank
	@Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$",
			message = "날짜형식(YYYY-MM-DD)을 확인해주세요")
	private String birthDate;
	
	@NotNull
	@NotBlank
	@Email
	private String email;

	private Set<AuthorityDto> authorityDtoSet;

	
	public UserDto() {
		super();
	}

	
	
	public UserDto(long id,
			@NotNull @NotBlank @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.") @Size(min = 3, max = 50) String loginId,
			@NotNull @NotBlank @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{8,20}$", message = "영문 숫자 특수문자를 포함한 8~20자리로 입력해주세요") String password,
			@NotNull @NotBlank @Size(min = 2, max = 20) String name,
			@NotNull @NotBlank @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "날짜형식(YYYY-MM-DD)을 확인해주세요") String birthDate,
			@NotNull @NotBlank @Email String email, Set<AuthorityDto> authorityDtoSet) {
		super();
		this.id = id;
		this.loginId = loginId;
		this.password = password;
		this.name = name;
		this.birthDate = birthDate;
		this.email = email;
		this.authorityDtoSet = authorityDtoSet;
	}



	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getLoginId() {
		return loginId;
	}



	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public LocalDate getBirthDate() {
		return LocalDate.parse(birthDate,
				DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}


	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public Set<AuthorityDto> getAuthorityDtoSet() {
		return authorityDtoSet;
	}



	public void setAuthorityDtoSet(Set<AuthorityDto> authorityDtoSet) {
		this.authorityDtoSet = authorityDtoSet;
	}



	public static UserDto from(User user) {
		if(user == null) return null;
		
		Set<AuthorityDto> authorityDtoSet = user.getAuthorities().stream()
				.map(Authority -> new AuthorityDto(Authority.getAuthorityType().name(), null))
				.collect(Collectors.toSet());
		return new UserDto(user.getId(),user.getLoginId(), null, user.getName(), user.getBirthDate().toString(), user.getEmail(), authorityDtoSet);
	}
}
