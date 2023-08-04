package com.project.leisure.vaild;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhoneResDto {
	
	private String phoneNumber;
	
	private int count;
	
	private int enable;
	
	public PhoneResDto toPhoneReqDto() {
		return PhoneResDto.builder()
				.phoneNumber(phoneNumber)
				.count(count)
				.enable(enable)
				.build();
	}
	
}
