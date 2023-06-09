package com.ssafy.palette.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Friend {

	// 기본키
	@Id
	@Column(name = "friend_id")
	@GeneratedValue
	private Long id;

	// 이름
	@NotNull
	@Column(columnDefinition = "VARCHAR(20)")
	private String kname;

	// 영문 이름
	@NotNull
	@Column(columnDefinition = "VARCHAR(20)")
	private String ename;

	// 설명
	@NotNull
	@Column(columnDefinition = "VARCHAR(100)")
	private String contents;

	// 태그
	@NotNull
	@Column(columnDefinition = "VARCHAR(100)")
	private String tag;

	// 가격
	@NotNull
	@Column
	private int price;

	public Friend() {
	}
}
