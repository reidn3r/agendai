package com.agendai.agendai_backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agendai.agendai_backend.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, UUID> {

    public void deleteByCpf(String cpf);
}
