CREATE TABLE IF NOT EXISTS testimonials (
  id                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_name_bn     VARCHAR(120)    NOT NULL,
  customer_location_bn VARCHAR(120)    NULL,
  quote_bn             VARCHAR(500)    NOT NULL,
  rating               TINYINT UNSIGNED NOT NULL DEFAULT 5,
  avatar_url           VARCHAR(500)    NULL,
  sort_order           INT             NOT NULL DEFAULT 0,
  is_active            TINYINT(1)      NOT NULL DEFAULT 1,
  created_at           DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_testimonials_active_sort (is_active, sort_order),
  CONSTRAINT chk_testimonials_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
