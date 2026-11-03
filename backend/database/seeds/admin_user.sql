-- Seed admin user (placeholder hash for development setup)
-- In production, SEED_ADMIN_PASSWORD is supplied via CLI migrate.php interpolation
INSERT INTO admin_users (email, password_hash, display_name, role, is_active, must_change_pw)
VALUES ('admin@foodghor.com', '$argon2id$v=19$m=65536,t=4,p=1$cGxhY2Vob2xkZXJzYWx0$eY0T0L0Kz7L9O8v7S6...', 'ফুড ঘর অ্যাডমিন', 'owner', 1, 1)
ON DUPLICATE KEY UPDATE display_name=VALUES(display_name);
