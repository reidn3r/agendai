package com.agendai.agendai_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agendai.agendai_backend.DTO.Professional.IProfessional;
import com.agendai.agendai_backend.DTO.Professional.ProfessionalDTO;
import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.SecretaryModel;
import com.agendai.agendai_backend.service.ProfessionalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/professional")
public class ProfessionalController {

    @Autowired
    ProfessionalService professionalService;

    @PostMapping("/create")
    public ResponseEntity<IProfessional> createProfessional(@RequestBody @Valid ProfessionalDTO data) throws Exception {
        return ResponseEntity.status(201).body(professionalService.createProfessional(data));
    }

    @GetMapping("/list/medic")
    public ResponseEntity<List<MedicModel>> medicList() {
        return ResponseEntity.status(200).body(professionalService.getMedicList());
    }

    @GetMapping("/list/secretary")
    public ResponseEntity<List<SecretaryModel>> secretaryList() {
        return ResponseEntity.status(200).body(professionalService.getSecretaryList());
    }

    @DeleteMapping("/delete/medic/{cpf}")
    public ResponseEntity<Object> deleteMedicByCPF(@PathVariable String cpf) throws Exception {
        return ResponseEntity.status(200).body(professionalService.deleteMedicByCPF(cpf));
    }

    @DeleteMapping("/delete/secretary/{cpf}")
    public ResponseEntity<Object> deleteSecretaryByCPF(@PathVariable String cpf) throws Exception {
        return ResponseEntity.status(200).body(professionalService.deleteSecretaryByCPF(cpf));
    }
}
