package com.example.NotesBuff.Notes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    // You can define custom queries here later, e.g., findByStatus(NoteStatus status)


}