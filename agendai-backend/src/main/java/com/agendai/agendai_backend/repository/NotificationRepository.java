package com.agendai.agendai_backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.NotificationModel;

public interface NotificationRepository extends JpaRepository<NotificationModel, UUID> {

}
