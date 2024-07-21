package com.example.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.crm.model.SupportTicket;
import com.example.crm.repository.SupportTicketRepository;
import java.util.List;

@Service
public class SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    public List<SupportTicket> getAllSupportTickets() {
        return supportTicketRepository.findAll();
    }

    public SupportTicket getSupportTicketById(Long id) {
        return supportTicketRepository.findById(id).orElse(null);
    }

    public SupportTicket createSupportTicket(SupportTicket supportTicket) {
        return supportTicketRepository.save(supportTicket);
    }

    public SupportTicket updateSupportTicket(Long id, SupportTicket supportTicketDetails) {
        SupportTicket supportTicket = supportTicketRepository.findById(id).orElse(null);
        if (supportTicket != null) {
            supportTicket.setTitle(supportTicketDetails.getTitle());
            supportTicket.setDescription(supportTicketDetails.getDescription());
            supportTicket.setStatus(supportTicketDetails.getStatus());
            return supportTicketRepository.save(supportTicket);
        }
        return null;
    }

    public void deleteSupportTicket(Long id) {
        supportTicketRepository.deleteById(id);
    }
}
