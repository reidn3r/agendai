package com.agendai.agendai_backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agendai.agendai_backend.DTO.Patient.PatientDTO;
import com.agendai.agendai_backend.model.ConsultationModel;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/create")
    public ResponseEntity<PatientModel> createPatient(@RequestBody @Valid PatientDTO data) throws Exception {
        return ResponseEntity.status(201).body(patientService.createPatient(data));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UUID> deletePatient(@PathVariable UUID id) throws Exception {
        return ResponseEntity.status(200).body(patientService.deletePatientById(id));
    }

    @GetMapping("/get/{email}")
    public ResponseEntity<PatientModel> findPatientByEmail(
            @PathVariable String email) throws Exception {
        Optional<PatientModel> foundPatient = patientService.getPatientByEmail(email);
        return ResponseEntity.status(200).body(foundPatient.get());
    }

    @GetMapping("/get/{name}")
    public ResponseEntity<PatientModel> findPatientByName(
            @PathVariable String name) throws Exception {
        Optional<PatientModel> foundPatient = patientService.getPatientByName(name);
        return ResponseEntity.status(200).body(foundPatient.get());
    }

    @GetMapping("/list")
    @CrossOrigin
    public ResponseEntity<List<PatientModel>> patientList() {
        return ResponseEntity.status(200).body(patientService.getPatientList());
    }

    @GetMapping("/list")
    @CrossOrigin
    public ResponseEntity<List<PatientModel>> patientList() {
        return ResponseEntity.status(200).body(patientService.getPatientList());
    }

}
