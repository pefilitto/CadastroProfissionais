CREATE TABLE profissional(
    id INT(5) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL, 
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    profissao VARCHAR(100) NOT NULL,
    especialidade VARCHAR(150) NOT NULL,
    localizacao VARCHAR(200) NOT NULL,
    experiencia VARCHAR(500) NOT NULL,
    registro VARCHAR(20) NOT NULL 
);

CREATE TABLE horario_profissional (
    id INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_profissional INT(5),
    dia DATE,
    horario TIME,
    FOREIGN KEY (id_profissional) REFERENCES profissional (id)
);