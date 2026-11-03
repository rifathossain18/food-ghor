CREATE TABLE IF NOT EXISTS audit_log (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  actor_id      BIGINT UNSIGNED NULL,
  action        VARCHAR(80)     NOT NULL,
  entity        VARCHAR(80)     NOT NULL,
  entity_id     BIGINT UNSIGNED NULL,
  metadata_json JSON            NULL,
  ip_address    VARBINARY(16)   NULL,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_audit_actor (actor_id, created_at),
  KEY idx_audit_entity (entity, entity_id),
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_id)
    REFERENCES admin_users(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
