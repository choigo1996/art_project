package com.cbw.art.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

}
