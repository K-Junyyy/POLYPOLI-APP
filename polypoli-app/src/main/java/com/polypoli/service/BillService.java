package com.polypoli.service;

import com.polypoli.entity.*;
import com.polypoli.model.dto.BillDto;
import com.polypoli.repository.BillRepository;
import com.polypoli.repository.BillUserMappingRepository;
import com.polypoli.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final BillUserMappingRepository billUserMappingRepository;

    public BillDto getBill(Long billId) {
        Bill bill = billRepository.getByBillId(billId);
        return toBillDto(bill);
    }

    public BillDto getBill(Long billId, Long userId) {
        BillDto billDto = getBill(billId);
        setLikeByUser(billDto, userId);

        return billDto;
    }

    public void updateBillLike(Long billId, Integer like, Integer dislike) {
        Bill bill = billRepository.getById(billId);
        if(bill.getYear() == 0) {
            setDate(bill);
        }
        bill.setLike(Objects.isNull(bill.getLike()) ? like : bill.getLike() + like);
        bill.setDislike(Objects.isNull(bill.getDislike()) ? dislike : bill.getDislike() + dislike);
        billRepository.save(bill);
    }

    public List<BillDto> getHotBills(Integer week, Integer month, Integer year, Long userKey) {
        List<Bill> bills = billRepository.findByWeekAndMonthAndYear(week, month, year);
        return bills.parallelStream()
            .map(this::toBillDto)
            .peek(billDto -> setLikeByUser(billDto, userKey))
            .collect(Collectors.toList());
    }

    private void setLikeByUser(BillDto billDto, Long userKey) {
        BillUserMapping billUserMapping = billUserMappingRepository.findByUserIdAndBillId(userKey, billDto.getBillId());
        billDto.setLikeByUser(billLikeConverter(billUserMapping));
    }

    private Integer billLikeConverter(BillUserMapping billUserMapping) {
        if(Objects.isNull(billUserMapping) || billUserMapping.getLike() == 0)
            return 0;
        else if(billUserMapping.getLike() < 0)
            return -1;
        else
            return 1;
    }

    private BillDto toBillDto(Bill bill) {
        return BillDto.builder()
                .billId(bill.getBillId())
                .committee(bill.getCommittee())
                .date(CommonUtils.dateToString(bill.getDate()))
                .feedContent(bill.getFeed_content())
                .main_content_and_reason(bill.getMain_content_and_reason())
                .main_proposer(bill.getMain_proposer())
                .proposers(bill.getProposers())
                .status(bill.getStatus())
                .title(bill.getTitle())
                .vote_result(bill.getVote_result())
                .like(bill.getLike())
                .dislike(bill.getDislike())
                .day(bill.getDay())
                .month(bill.getMonth())
                .build();
    }

    private void setDate(Bill bill) {
        Date billDate = bill.getDate();
        Calendar billCalendar = Calendar.getInstance();
        billCalendar.setTime(billDate);

        bill.setWeek(billCalendar.get(Calendar.DAY_OF_MONTH));
        bill.setWeek(billCalendar.get(Calendar.WEEK_OF_MONTH));
        bill.setMonth(billCalendar.get(Calendar.MONTH) + 1);
        bill.setYear(billCalendar.get(Calendar.YEAR));
    }
}
