package com.agendai.agendai_backend.service;

import com.agendai.agendai_backend.DTO.Consultation.ConsultationResponseDTO;
import com.agendai.agendai_backend.controller.EmailController;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.repository.ConsultationRepository;
import com.agendai.agendai_backend.repository.PatientRepository;
import jakarta.mail.Message;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public String emailConfirmacao(ConsultationResponseDTO consultationResponseDTO){
        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String emailDestinatario;
            UUID idConsulta = consultationResponseDTO.id();
            LocalDateTime dataConsulta = consultationResponseDTO.data();
            String nomePaciente = consultationResponseDTO.patientName();

            Optional<PatientModel> destinatario = patientRepository.findById(consultationResponseDTO.patientId());
            if (destinatario.isPresent()) {
                emailDestinatario = destinatario.get().getEmail();
            } else {
                throw new RuntimeException("Paciente não econtrado com o ID: " + consultationResponseDTO.id());
            }

            helper.setFrom("email.consultorio.agendai@gmail.com");
            helper.setTo(emailDestinatario);
            helper.setSubject("Confirmação de Consulta");

            ClassPathResource resource = new ClassPathResource("templates/email_confirmacao.html");
            String htmlContent = Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);

            htmlContent = htmlContent.replace("{{ID}}", idConsulta.toString());
            htmlContent = htmlContent.replace("{{DATA}}", dataConsulta.toString());
            htmlContent = htmlContent.replace("{{NOME}}", nomePaciente);
            htmlContent = htmlContent.replace("{{ENDPOINT}}", "http://localhost:8080/consultation/confirmar/" + idConsulta);

            System.out.println(htmlContent);
            helper.setText(htmlContent, true);
            mailSender.send(message);

            return "Email enviado!";
        } catch (Exception e){
            return e.getMessage();
        }
    }



}
