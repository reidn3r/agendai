package com.agendai.agendai_backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agendai.agendai_backend.DTO.Notification.NotificationResponseDTO;
import com.agendai.agendai_backend.model.NotificationModel;
import com.agendai.agendai_backend.repository.NotificationRepository;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/list")
    @CrossOrigin
    public ResponseEntity<List<NotificationResponseDTO>> getNotification() {
        List<NotificationModel> notifications = notificationRepository.findAll();
        List<NotificationResponseDTO> notificationDTOs = notifications.stream()
                .map(NotificationResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.status(200).body(notificationDTOs);
    }
}
