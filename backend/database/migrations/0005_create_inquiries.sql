CREATE TABLE IF NOT EXISTS inquiries (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120)    NOT NULL,
  phone         VARCHAR(20)     NOT NULL,
  email         VARCHAR(190)    NULL,
  product_id    BIGINT UNSIGNED NULL,
  quantity      INT             NULL,
  inquiry_type  ENUM('retail','wholesale') NOT NULL DEFAULT 'retail',
  message       VARCHAR(500)    NULL,
  source_page   VARCHAR(120)    NULL,
  utm_source    VARCHAR(120)    NULL,
  utm_medium    VARCHAR(120)    NULL,
  utm_campaign  VARCHAR(120)    NULL,
  ip_address    VARBINARY(16)   NULL,
  user_agent    VARCHAR(500)    NULL,
  status        ENUM('new','contacted','converted','closed')
                                NOT NULL DEFAULT 'new',
  notes         TEXT            NULL,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inquiries_status_created (status, created_at),
  KEY idx_inquiries_created (created_at),
  KEY idx_inquiries_product (product_id),
  CONSTRAINT fk_inquiries_product FOREIGN KEY (product_id)
    REFERENCES products(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
