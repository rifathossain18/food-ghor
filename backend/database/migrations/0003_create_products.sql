CREATE TABLE IF NOT EXISTS products (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id   BIGINT UNSIGNED NOT NULL,
  slug          VARCHAR(140)    NOT NULL,
  name_bn       VARCHAR(160)    NOT NULL,
  short_desc_bn VARCHAR(280)    NOT NULL,
  long_desc_bn  TEXT            NULL,
  price_bdt     DECIMAL(10,2)   NOT NULL,
  weight_grams  INT             NULL,
  stock_status  ENUM('in_stock','out_of_stock','preorder')
                                NOT NULL DEFAULT 'in_stock',
  image_primary VARCHAR(500)    NOT NULL,
  images_json   JSON            NULL,
  is_featured   TINYINT(1)      NOT NULL DEFAULT 0,
  is_active     TINYINT(1)      NOT NULL DEFAULT 1,
  meta_title_bn VARCHAR(160)    NULL,
  meta_desc_bn  VARCHAR(320)    NULL,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_category (category_id, is_active),
  KEY idx_products_featured (is_featured, is_active),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id)
    REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
