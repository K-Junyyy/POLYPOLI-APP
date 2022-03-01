package com.polypoli.controller;

import com.polypoli.entity.Congressman;
import com.polypoli.model.dto.CongressmanDto;
import com.polypoli.service.CongressmanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CongressmanController {

    private final CongressmanService congressmanService;

    @GetMapping("/congressman")
    public CongressmanDto getCongressMan(@RequestParam(name = "id") Long id) {
        return congressmanService.getCongressman(id);
    }

    @GetMapping("/congressmen")
    public List<CongressmanDto> getCongressMen(@RequestParam List<Long> congressmanIds) {
        return congressmanService.getCongressMen(congressmanIds);
    }

    @GetMapping("/congressmenByUserId")
    public List<CongressmanDto> getCongressMenByUserId(@RequestParam String userId) {
        return congressmanService.getCongressMenByUserId(userId);
    }

    @GetMapping("/getCongressmanByRegion")
    public CongressmanDto getCongressmanByRegion(@RequestParam String region) {
        return congressmanService.getCongressmanByRegion(region);
    }

    @GetMapping("/searchCongressmanList")
    public List<Congressman> searchCongressmanList(@RequestParam String name, @RequestParam String region,
            @RequestParam String party) {
        return congressmanService.searchCongressmanList(name, region, party);
    }
}
