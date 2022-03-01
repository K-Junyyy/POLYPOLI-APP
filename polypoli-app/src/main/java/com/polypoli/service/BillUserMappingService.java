package com.polypoli.service;

import com.polypoli.entity.BillUserMapping;
import com.polypoli.repository.BillUserMappingRepository;
import com.polypoli.request.BillUserMappingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BillUserMappingService {

    private final BillUserMappingRepository billUserMappingRepository;
    private final BillService billService;

    public void upsertBillLike(BillUserMappingRequest request) {
        BillUserMapping entity = billUserMappingRepository.findByUserIdAndBillId(request.getUserId(), request.getBillId());
        updateBillRank(entity, request.getBillId(), request.getLike());
        if(Objects.isNull(entity)) {
            entity = new BillUserMapping();
            entity.setUserId(request.getUserId());
            entity.setBillId(request.getBillId());
        }
        entity.setLike(request.getLike());
        billUserMappingRepository.save(entity);
    }

    private void updateBillRank(BillUserMapping entity, Long billId, Integer like) {
        if(Objects.isNull(entity)) {
            if(like == 1){
                billService.updateBillLike(billId, 1, 0);
            } else if(like == -1){
                billService.updateBillLike(billId, 0, 1);
            }
        } else {
            if(entity.getLike() == 1) {
                if(like == -1){
                    billService.updateBillLike(billId, -1, 1);
                } else if(like == 0){
                    billService.updateBillLike(billId, -1, 0);
                }
            } else if(entity.getLike() == -1) {
                if(like == 1){
                    billService.updateBillLike(billId, 1, -1);
                } else if(like == 0){
                    billService.updateBillLike(billId, 0, -1);
                }
            } else if(entity.getLike() == 0) {
                if(like == 1){
                    billService.updateBillLike(billId, 1, 0);
                } else if(like == -1){
                    billService.updateBillLike(billId, 0, 1);
                }
            }
        }
    }
}
