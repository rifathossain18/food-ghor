CREATE TABLE IF NOT EXISTS rate_limit_hits (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip_address VARBINARY(16)   NOT NULL,
  endpoint   VARCHAR(120)    NOT NULL,
  hit_at     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_rl_lookup (ip_address, endpoint, hit_at),
  KEY idx_rl_cleanup (hit_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
