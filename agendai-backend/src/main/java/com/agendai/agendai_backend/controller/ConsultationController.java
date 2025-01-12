package com.agendai.agendai_backend.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agendai.agendai_backend.DTO.Consultation.ConsultationDTO;
import com.agendai.agendai_backend.DTO.Consultation.ConsultationResponseDTO;
import com.agendai.agendai_backend.model.ConsultationModel;
import com.agendai.agendai_backend.service.ConsultationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/consultation")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @PostMapping("/create")
    public ResponseEntity<ConsultationResponseDTO> createConsultation(@RequestBody @Valid ConsultationDTO data)
            throws Exception {
        return ResponseEntity.status(201).body(consultationService.createConsultation(data));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UUID> deleteConsultation(@PathVariable UUID id) throws Exception {
        UUID deletedId = consultationService.deleteConsultationById(id);
        return ResponseEntity.status(200).body(deletedId);
    }
}
