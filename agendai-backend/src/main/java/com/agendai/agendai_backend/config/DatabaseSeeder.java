package com.agendai.agendai_backend.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.agendai.agendai_backend.DTO.User.UserRole;
import com.agendai.agendai_backend.model.CandidatesModel;
import com.agendai.agendai_backend.model.ConsultationModel;
import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.NotificationModel;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.model.SecretaryModel;
import com.agendai.agendai_backend.model.UserModel;
import com.agendai.agendai_backend.repository.CandidatesRepository;
import com.agendai.agendai_backend.repository.ConsultationRepository;
import com.agendai.agendai_backend.repository.MedicRepository;
import com.agendai.agendai_backend.repository.NotificationRepository;
import com.agendai.agendai_backend.repository.PatientRepository;
import com.agendai.agendai_backend.repository.SecretaryRepository;
import com.agendai.agendai_backend.repository.UserRepository;
import com.agendai.agendai_backend.service.PasswordService;

@Configuration
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private MedicRepository medicRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SecretaryRepository secretaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CandidatesRepository candidatesRepository;

    @Autowired
    private PasswordService passwordService;

    @Override
    public void run(String... args) throws Exception {
        // Criando Médicos
        MedicModel medic1 = new MedicModel("Dr. João Silva", "05079900059");
        MedicModel medic2 = new MedicModel("Dra. Maria Santos", "39184783001");
        medicRepository.saveAll(Arrays.asList(medic1, medic2));

        // Criando Secretárias
        SecretaryModel secretary1 = new SecretaryModel("Ana Oliveira", "34905188024");
        SecretaryModel secretary2 = new SecretaryModel("Carlos Souza", "50201349027");
        secretaryRepository.saveAll(Arrays.asList(secretary1, secretary2));

        // Criando Usuários para as secretárias
        UserModel user1 = new UserModel(
                "ana@clinica.com",
                passwordService.hashPassword("senha123"),
                UserRole.SECRETARY,
                "66674980072",
                secretary1);
        UserModel user2 = new UserModel(
                "carlos@clinica.com",
                passwordService.hashPassword("senha456"),
                UserRole.SECRETARY,
                "17449254026",
                secretary2);
        userRepository.saveAll(Arrays.asList(user1, user2));

        // Criando Pacientes
        PatientModel patient1 = new PatientModel();
        patient1.setNome("Vitor Padovani");
        patient1.setEmail("ra128169@uem.br");
        patient1.setCpf("16230263009");
        patient1.setDataNascimento(LocalDate.of(1990, 5, 15));
        patient1.setTelefone("11999887766");

        PatientModel patient2 = new PatientModel();
        patient2.setNome("Julia Costa");
        patient2.setEmail("julia@email.com");
        patient2.setCpf("11607372070");
        patient2.setDataNascimento(LocalDate.of(1985, 8, 22));
        patient2.setTelefone("11977665544");

        patientRepository.saveAll(Arrays.asList(patient1, patient2));

        // Criando Notificações
        NotificationModel notification1 = new NotificationModel();
        notification1.setMessage("Lembrete de consulta amanhã");
        notification1.setTipo("LEMBRETE");
        notification1.setPatients(Arrays.asList(patient1));

        NotificationModel notification2 = new NotificationModel();
        notification2.setMessage("Resultado de exame disponível");
        notification2.setTipo("RESULTADO");
        notification2.setPatients(Arrays.asList(patient1, patient2));

        notificationRepository.saveAll(Arrays.asList(notification1, notification2));

        // Criando Consultas
        ConsultationModel consultation1 = new ConsultationModel();
        consultation1.setDate(LocalDateTime.now().plusDays(1));
        consultation1.setMedic(medic1);
        consultation1.setPatient(patient1);
        consultation1.setSecretary(secretary1);

        ConsultationModel consultation2 = new ConsultationModel();
        consultation2.setDate(LocalDateTime.now().plusDays(2));
        consultation2.setMedic(medic2);
        consultation2.setPatient(patient2);
        consultation2.setSecretary(secretary2);

        consultationRepository.saveAll(Arrays.asList(consultation1, consultation2));

        // Criando Candidatos
        CandidatesModel candidate1 = new CandidatesModel();
        candidate1.setRanking(1);
        candidate1.setPatient(patient1);
        candidate1.setConsultation(null);

        CandidatesModel candidate2 = new CandidatesModel();
        candidate2.setRanking(2);
        candidate2.setPatient(patient2);
        candidate2.setConsultation(null);

        candidatesRepository.saveAll(Arrays.asList(candidate1, candidate2));

        System.out.println(secretary1.getId());
        System.out.println(medic1.getId());
        System.out.println(patient1.getId());
    }
}