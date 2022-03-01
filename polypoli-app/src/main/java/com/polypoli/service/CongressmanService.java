package com.polypoli.service;

import com.amazonaws.util.StringUtils;
import com.polypoli.entity.Congressman;
import com.polypoli.model.dto.CongressmanDto;
import com.polypoli.repository.CongressmanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CongressmanService {

    private final CongressmanRepository congressmanRepository;
    private final UserService userService;

    public CongressmanDto getCongressman(Long id) {

        Optional<Congressman> entity = congressmanRepository.findById(id);
        return entity.map(this::toCongressmanDto).orElse(null);
    }

    public List<CongressmanDto> getCongressMen(List<Long> congressmanIds) {
        return congressmanIds.parallelStream()
                .map(congressmanRepository::findById)
                .map(Optional::get)
                .map(this::toCongressmanDto)
                .collect(Collectors.toList());
    }

    public List<CongressmanDto> getCongressMenByUserId(String userId) {
        List<Long> congressmanIds = userService.getUserFollowings(userId);
        return congressmanIds.parallelStream()
                .map(congressmanRepository::findById)
                .map(Optional::get)
                .map(this::toCongressmanDto)
                .collect(Collectors.toList());
    }

    public CongressmanDto getCongressmanByRegion(String region) {

        Congressman entity = congressmanRepository.findByRegion(region);
        return toCongressmanDto(entity);
    }

    public List<Congressman> searchCongressmanList(String name, String region, String party) {

        return congressmanRepository.findByNameLikeAndRegionLikeAndPartyLike(name, region, party);
    }

    public CongressmanDto toCongressmanDto(Congressman entity) {
        return CongressmanDto.builder()
                .congressmanId(entity.getCongressmanId())
                .name(entity.getName())
                .age(entity.getAge())
                .gender(entity.getGender())
                .profileImage(entity.getProfile_image())
                .party(entity.getParty())
                .region(entity.getRegion())
                .committee(entity.getCommittee())
                .academicBackground(entity.getAcademic_background())
                .career(entity.getCareer())
                .tel(entity.getTel())
                .win(winToList(entity.getWin()))
                .build();
    }

    private List<Long> winToList(String win) {
        if (StringUtils.isNullOrEmpty(win))
            return Collections.emptyList();
        return Arrays.stream(win.split(","))
                .map(String::trim)
                .map(Long::parseLong)
                .collect(Collectors.toList());
    }
}
