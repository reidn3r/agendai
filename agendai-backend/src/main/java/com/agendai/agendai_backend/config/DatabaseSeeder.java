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
        MedicModel medic3 = new MedicModel("Dr. Mario Bros", "73745739019");
        MedicModel medic4 = new MedicModel("Dr. Adnan", "94003962010");
        MedicModel medic5 = new MedicModel("Dr. Paes", "27719944020");
        MedicModel medic6 = new MedicModel("Dr. Padovani", "43946267068");
        MedicModel medic7 = new MedicModel("Dr. Leo", "31087610052");
        MedicModel medic8 = new MedicModel("Dr. JV", "07802566037");
        medicRepository.saveAll(Arrays.asList(medic1, medic2, medic3, medic4, medic5, medic6, medic7, medic8));

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

        PatientModel patient3 = new PatientModel();
        patient3.setNome("Tony Stark");
        patient3.setEmail("tony.stark@starkindustries.com");
        patient3.setCpf("64715679019");
        patient3.setDataNascimento(LocalDate.of(1970, 5, 29));
        patient3.setTelefone("11999887766");

        PatientModel patient4 = new PatientModel();
        patient4.setNome("Leia Organa");
        patient4.setEmail("leia.organa@rebellion.com");
        patient4.setCpf("86521348043");
        patient4.setDataNascimento(LocalDate.of(1956, 10, 21));
        patient4.setTelefone("11887766555");

        PatientModel patient5 = new PatientModel();
        patient5.setNome("Bruce Wayne");
        patient5.setEmail("bruce.wayne@wayneenterprises.com");
        patient5.setCpf("80282593080");
        patient5.setDataNascimento(LocalDate.of(1939, 4, 7));
        patient5.setTelefone("11911223344");

        PatientModel patient6 = new PatientModel();
        patient6.setNome("Lara Croft");
        patient6.setEmail("lara.croft@adventure.com");
        patient6.setCpf("52262745056");
        patient6.setDataNascimento(LocalDate.of(1992, 2, 14));
        patient6.setTelefone("11955667788");

        PatientModel patient7 = new PatientModel();
        patient7.setNome("Walter White");
        patient7.setEmail("walter.white@breakingbad.com");
        patient7.setCpf("97816286007");
        patient7.setDataNascimento(LocalDate.of(1958, 9, 7));
        patient7.setTelefone("11881234567");

        PatientModel patient8 = new PatientModel();
        patient8.setNome("Sherlock Holmes");
        patient8.setEmail("sherlock.holmes@bakerstreet.com");
        patient8.setCpf("60267842090");
        patient8.setDataNascimento(LocalDate.of(1854, 1, 6));
        patient8.setTelefone("11778899665");

        PatientModel patient9 = new PatientModel();
        patient9.setNome("Ellen Ripley");
        patient9.setEmail("ellen.ripley@weyland.com");
        patient9.setCpf("74873116007");
        patient9.setDataNascimento(LocalDate.of(1979, 10, 26));
        patient9.setTelefone("11665544332");

        PatientModel patient10 = new PatientModel();
        patient10.setNome("Geralt de Rivia");
        patient10.setEmail("geralt@kaermorhen.com");
        patient10.setCpf("44003836014");
        patient10.setDataNascimento(LocalDate.of(1250, 3, 1));
        patient10.setTelefone("11553322110");


        patientRepository.saveAll(Arrays.asList(patient1, patient2, patient3, patient4, patient5, patient6, patient7, patient8, patient9, patient10));

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