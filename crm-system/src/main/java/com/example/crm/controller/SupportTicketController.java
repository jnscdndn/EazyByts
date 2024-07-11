package com.example.crm.controller;

import com.example.crm.model.SupportTicket;
import com.example.crm.service.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support-tickets")
public class SupportTicketController {
    @Autowired
    private SupportTicketService supportTicketService;

    @GetMapping
    public List<SupportTicket> getAllSupportTickets() {
        return supportTicketService.getAllSupportTickets();
    }

    @PostMapping
    public SupportTicket saveSupportTicket(@RequestBody SupportTicket supportTicket) {
        return supportTicketService.saveSupportTicket(supportTicket);
    }

    @DeleteMapping("/{id}")
    public void deleteSupportTicket(@PathVariable Long id) {
        supportTicketService.deleteSupportTicket(id);
    }
}
