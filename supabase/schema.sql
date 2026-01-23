-- Table users
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table diagnostics
CREATE TABLE diagnostics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  linkedin_data JSONB,
  quiz_answers JSONB NOT NULL,
  archetype VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  score_breakdown JSONB,
  diagnostic_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_diagnostics_user_id ON diagnostics(user_id);
CREATE INDEX idx_users_email ON users(email);
